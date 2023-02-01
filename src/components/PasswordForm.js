import { ActionIcon, Anchor, Box, Button, Card, keyframes, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEye, IconEyeOff, IconLock, IconRun } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormState } from "../utils/form-state";

const PasswordForm = ({ slug }) => {
  const router = useRouter();
  const [formState, setFormState] = useState(FormState.INITIAL);
  const [showPassword, setShowPassword] = useState(false);
  const [shortl, setShortl] = useState(null);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      password: "",
    },
  });

  const handleSubmit = (values) => {
    const action = "verify";
    setShowPassword(false);
    setFormState(FormState.LOADING);

    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY, { action: action })
        .then(async function (token) {
          await axios
            .post(`/api/shortl/${slug}`, {
              ...values,
              recaptchaResponse: token,
              action: action,
            })
            .then((response) => {
              setShortl(response.data);
              form.reset();
              setFormState(FormState.SUCCESS);

              setTimeout(() => {
                router.push(response.data.url);
              }, 3000);
            })
            .catch((error) => {
              form.setErrors(error.response.data);
              setFormState(FormState.FAILED);
            });
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
    <Card radius="md" shadow="sm" withBorder>
      {formState === FormState.SUCCESS && shortl ? (
        <Box>
          <Title mb={"md"}>
            <IconRun /> Redirecting to
            <Text component={"span"} sx={{ animation: `${focusIn} 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both` }}>
              .
            </Text>
            <Text
              component={"span"}
              sx={{ animation: `${focusIn} 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) 1s both` }}
            >
              .
            </Text>
            <Text
              component={"span"}
              sx={{ animation: `${focusIn} 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) 2s both` }}
            >
              .
            </Text>
          </Title>
          <Anchor href={shortl.url} rel={"noopener noreferrer"} target={"_blank"}>
            {shortl.url}
          </Anchor>
        </Box>
      ) : (
        <Box component="form" noValidate onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Title mb={"md"} order={2} sx={{ display: "flex", alignItems: "center" }}>
            <IconLock />
            <Text ml={"sm"}>This link is password protected</Text>
          </Title>
          <TextInput
            disabled={formState === FormState.LOADING}
            label="Password"
            mb="lg"
            name="password"
            rightSection={
              <ActionIcon aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </ActionIcon>
            }
            size="md"
            type={showPassword ? "text" : "password"}
            {...form.getInputProps("password")}
          />
          {form.errors.form && (
            <Text color="red" mb="lg">
              {form.errors.form}
            </Text>
          )}
          <Button loading={formState === FormState.LOADING} type="submit" fullWidth>
            Unlock
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default PasswordForm;
