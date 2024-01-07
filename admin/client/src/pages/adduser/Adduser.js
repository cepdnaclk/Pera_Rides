import styled from "styled-components";
import HeaderTitle from "../../components/headerTitle/HeaderTitle";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const AddUserMain = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 30px;
`;

const FormContainer = styled.div`
  width: 100%;
`;

const StyledForm = styled.form``;

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
};

const usernameRegX = /^\S+$/;
const phoneRegX = /^\b0\d{9}\b/;
const emailRegX = /^[a-zA-Z0-9._%+-]+@[^@\s]+\.pdn\.ac\.lk$/;

const userVallidationSchema = yup.object().shape({
  username: yup
    .string()
    .matches(usernameRegX, "Username can't have white spaces.")
    .required("required"),

  email: yup
    .string()
    .matches(emailRegX, "Email is not valid (need to include [pdn.ac.lk]).")
    .required("required"),

  password: yup.string().required("required"),

  confirmPassword: yup.string().required("required"),

  phone: yup
    .string()
    .matches(phoneRegX, "Phone number is not valid.")
    .required("required"),
});

const Adduser = () => {
  const isMobile = useMediaQuery("(min-width: 600px)");

  const handleFormSubmit = () => {
    console.log("submitted");
  };

  return (
    <AddUserMain>
      <HeaderTitle title="CREATE USER" desc="create a new user profile" />
      <FormContainer>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={userVallidationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <StyledForm onSubmit={handleSubmit}>
              <Box
                margin={"30px 0px 0 0"}
                width={"80%"}
                display="grid"
                gap="30px"
                gridAutoColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isMobile ? undefined : "span 4",
                  },
                }}
              >
                <TextField
                  fullWidth
                  required
                  variant="filled"
                  type="text"
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  required
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  required
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  required
                  variant="filled"
                  type="password"
                  label="Confirm Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  error={!!touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  required
                  variant="filled"
                  type="text"
                  label="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  name="phone"
                  error={!!touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="end"
                margin={"20px 0px 0 0"}
                width={"80%"}
              >
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  sx={{
                    fontWeight: "bolder",
                    letterSpacing: "1px",
                  }}
                >
                  Create new user
                </Button>
              </Box>
            </StyledForm>
          )}
        </Formik>
      </FormContainer>
    </AddUserMain>
  );
};

export default Adduser;
