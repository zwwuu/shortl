import { useState } from "react";
import Script from "next/script";
import { ActionIcon, Box, Button, Card, Group, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { createShortlSchema } from "shortl-schema";

import { api } from "~/utils/api";
import ShareButton from "~/components/Buttons/ShareButton";
import VisitButton from "~/components/Buttons/VisitButton";
import ShortlInfo from "~/components/Shortl/ShortlInfo";
import { useHistory } from "~/context/HistoryContext";
import { FormState } from "~/types/form-state";
import { Shortl } from "~/types/shortl";

export default function ShortlForm() {
  const { add } = useHistory();
  const [shortl, setShortl] = useState<Shortl | null>(null);
  const createMutation = api.shortl.create.useMutation({
    onError: (err) => {
      setFormState(FormState.FAILED);
      if (err?.data?.zodError) {
        form.setErrors({ ...err.data.zodError.fieldErrors });
      } else {
        form.setErrors({ form: err.message });
      }
    },
    onSuccess: (data) => {
      setFormState(FormState.SUCCESS);
      form.reset();
      add(data);
      setShortl(data);
    },
  });
  const [formState, setFormState] = useState(FormState.INITIAL);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      url: "",
      password: "",
    },
    validate: zodResolver(createShortlSchema),
  });

  const handleSubmit = (values: { url: string; password: string }) => {
    const action = "create";
    setShowPassword(false);
    setFormState(FormState.LOADING);

    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute(`${process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}`, { action: action })
        .then((token) => {
          createMutation.mutate({ ...values, token, action });
        })
        .then(null, (_) => {
          form.setErrors({ form: "Failed to obtain reCaptcha token. Please try again later." });
          setFormState(FormState.FAILED);
        });
    });
  };

  const resetForm = () => {
    form.reset();
    setShortl(null);
    setFormState(FormState.INITIAL);
  };

  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}`} />
      <Card radius={"md"} shadow={"sm"} sx={{ overflow: "visible" }} withBorder>
        {formState === FormState.SUCCESS && shortl ? (
          <>
            <Box mb={"sm"}>
              <ShortlInfo slug={shortl.slug} url={shortl.url} />
            </Box>
            <Box mb={"md"}>
              <Group position={"right"}>
                <VisitButton slug={shortl.slug} />
                <ShareButton slug={shortl.slug} />
              </Group>
            </Box>
            <Button
              size={"lg"}
              variant={"outline"}
              fullWidth
              onClick={() => {
                resetForm();
              }}
            >
              Shorten another
            </Button>
          </>
        ) : (
          <Box component={"form"} onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              disabled={formState === FormState.LOADING}
              label={"Paste a link here to shorten it"}
              mb={"lg"}
              name={"url"}
              size={"md"}
              type={"url"}
              {...form.getInputProps("url")}
              required
            />
            <TextInput
              disabled={formState === FormState.LOADING}
              label={"Password"}
              maxLength={128}
              mb={"lg"}
              name={"password"}
              placeholder={"Leave blank for no password"}
              rightSection={
                <ActionIcon aria-label={"Toggle password visibility"} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <IconEyeOff /> : <IconEye />}
                </ActionIcon>
              }
              size={"md"}
              type={showPassword ? "text" : "password"}
              {...form.getInputProps("password")}
            />
            {form.errors.form && (
              <Text color={"red"} mb={"lg"}>
                {form.errors.form}
              </Text>
            )}
            <Button loading={formState === FormState.LOADING} type={"submit"} fullWidth>
              Shorten
            </Button>
          </Box>
        )}
      </Card>
    </>
  );
}
