import { ActionIcon, Box, Button, Card, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEye, IconEyeOff } from "@tabler/icons";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "../context/HistoryContext";
import { FormState } from "../utils/form-state";
import { isMaxLength, isUrl } from "../utils/validation";
import ShortlItem from "./shortl/ShortlItem";

const ShortlForm = () => {
  const { addShortl } = useHistory();
  const [formState, setFormState] = useState(FormState.INITIAL);
  const [showPassword, setShowPassword] = useState(false);
  const [shortl, setShortl] = useState(null);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      url: "",
      password: "",
    },
    validate: {
      url: (value) => (isUrl(value) ? undefined : "Link must start with http:// or https://"),
      password: (value) =>
        isMaxLength(value, process.env.NEXT_PUBLIC_APP_LINK_PASSWORD_MAX_LENGTH)
          ? null
          : `Password must be less than ${process.env.NEXT_PUBLIC_APP_LINK_PASSWORD_MAX_LENGTH} characters`,
    },
  });

  const handleSubmit = (values) => {
    const action = "create";
    setShowPassword(false);
    setFormState(FormState.LOADING);

    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY, { action: action })
        .then(async function (token) {
          await axios
            .post("/api/shortl", {
              ...values,
              recaptchaResponse: token,
              action: action,
            })
            .then((response) => {
              addShortl(response.data);
              form.reset();
              setShortl(response.data);
              setFormState(FormState.SUCCESS);
            })
            .catch((error) => {
              form.setErrors(error.response.data);
              setFormState(FormState.FAILED);
            });
        });
    });
  };

  const resetForm = () => {
    setShortl(null);
    setFormState(FormState.INITIAL);
  };

  return (
    <Card radius="md" shadow="sm" sx={{ overflow: "visible" }} withBorder>
      {formState === FormState.SUCCESS && shortl ? (
        <ShortlItem shortl={shortl} onReset={resetForm} />
      ) : (
        <Box component="form" noValidate onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            disabled={formState === FormState.LOADING}
            label="Paste a link here to shorten it"
            mb="lg"
            name="url"
            size="md"
            type="url"
            {...form.getInputProps("url")}
            required
          />
          <TextInput
            disabled={formState === FormState.LOADING}
            label="Password"
            maxLength={process.env.NEXT_PUBLIC_APP_LINK_PASSWORD_MAX_LENGTH}
            mb="lg"
            name="password"
            placeholder={"Leave blank for no password"}
            rightSection={
              <ActionIcon aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </ActionIcon>
            }
            size="md"
            type={showPassword ? "text" : "password"}
            {...form.getInputProps("password")}
          />
          {form.errors.error && (
            <Text color="red" mb="lg">
              {form.errors.error}
            </Text>
          )}
          <Button loading={formState === FormState.LOADING} type="submit" fullWidth>
            Shorten
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default ShortlForm;
