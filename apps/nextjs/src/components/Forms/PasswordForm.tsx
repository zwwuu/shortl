import { useState } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import { ActionIcon, Anchor, Box, Button, Card, Text, TextInput, Title, keyframes } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEye, IconEyeOff, IconLock, IconRun } from "@tabler/icons-react";

import { api } from "~/utils/api";
import { FormState } from "~/types/form-state";
import { UnlockedShortl } from "~/types/shortl";

type PasswordFormProps = {
  slug: string;
};

export default function PasswordForm({ slug }: PasswordFormProps) {
  const router = useRouter();
  const unlockMutation = api.shortl.unlock.useMutation({
    onError: (err) => {
      setFormState(FormState.FAILED);
      if (err?.data?.zodError) {
        form.setErrors({ password: err.data.zodError.fieldErrors.password });
      } else {
        form.setErrors({ form: err.message });
      }
    },
    onSuccess: (data) => {
      setFormState(FormState.SUCCESS);
      form.reset();
      setShortl(data);
      setTimeout(() => {
        void router.push(data.url);
      }, 3000);
    },
  });
  const [formState, setFormState] = useState(FormState.INITIAL);
  const [showPassword, setShowPassword] = useState(false);
  const [shortl, setShortl] = useState<UnlockedShortl | null>(null);
  const form = useForm({
    initialValues: {
      password: "",
    },
  });

  const handleSubmit = (values: { password: string }) => {
    const action = "unlock";
    setShowPassword(false);
    setFormState(FormState.LOADING);

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(`${process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}`, { action: action })
        .then((token) => {
          unlockMutation.mutate({ ...values, slug, token, action });
        })
        .then(null, (_) => {
          form.setErrors({ form: "Failed to obtain reCaptcha token. Please try again later." });
          setFormState(FormState.FAILED);
        });
    });
  };

  const focusIn = keyframes({
    "0%": {
      filter: "blur(12px)",
      opacity: 0,
    },
    "100%": {
      filter: "blur(0px)",
      opacity: 1,
    },
  });

  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}`} />
      <Card radius={"md"} shadow={"sm"} withBorder>
        {formState === FormState.SUCCESS && shortl ? (
          <Box>
            <Title mb={"md"}>
              <IconRun /> Redirecting to
              <Text sx={{ animation: `${focusIn} 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both` }} span>
                .
              </Text>
              <Text sx={{ animation: `${focusIn} 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) 1s both` }} span>
                .
              </Text>
              <Text sx={{ animation: `${focusIn} 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) 2s both` }} span>
                .
              </Text>
            </Title>
            <Anchor href={shortl.url} rel={"noopener noreferrer"} target={"_blank"}>
              {shortl.url}
            </Anchor>
          </Box>
        ) : (
          <Box component={"form"} noValidate onSubmit={form.onSubmit(handleSubmit)}>
            <Title mb={"md"} order={2} sx={{ display: "flex", alignItems: "center" }}>
              <IconLock />
              <Text ml={"sm"}>This link is password protected</Text>
            </Title>
            <TextInput
              disabled={formState === FormState.LOADING}
              label={"Password"}
              mb={"lg"}
              name={"password"}
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
              Unlock
            </Button>
          </Box>
        )}
      </Card>
    </>
  );
}
