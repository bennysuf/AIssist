import { useEffect, useState } from "react";
import { useUserStore } from "../util/stores/userStore";
import {
  TextField,
  Box,
  VisibilityIcon,
  VisibilityOffIcon,
  Typography,
  Divider,
  EditNoteRoundedIcon,
  Button,
} from "../util/muiExports";

const userData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export default function Profile() {
  const { user, updateProfile, error } = useUserStore();
  const [editMode, setEditMode] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [errorMessage, setErrorMessage] = useState({
    ...userData,
    currentPassword: "",
    newPassword: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        phone: user?.phone,
      });
    }
  }, [user]);

  useEffect(
    function setErrors() {
      if (error) {
        if (error.toLowerCase().includes("email")) {
          setErrorMessage((prev) => ({
            ...prev,
            email: error,
          }));
        }
      }
    },
    [error]
  );

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage({ ...userData, currentPassword: "", newPassword: "" });

    const newErrors: Partial<typeof errorMessage> = {};

    for (const key in formData) {
      const typedKey = key as keyof typeof formData;
      if (formData[typedKey] === "" && typedKey !== "phone") {
        newErrors[typedKey] = `Please fill out your ${typedKey.replace(
          "Name",
          " name"
        )}`;
      } else if (typedKey === "phone") {
        const cleanedNumber = formData.phone?.replace(/\D/g, "");

        if (
          cleanedNumber &&
          (cleanedNumber.length !== 10 || !/^\d{10}$/.test(cleanedNumber))
        ) {
          newErrors.phone = "Please enter a valid 10-digit phone number";
        }

        continue; // Skip phone from required check
      }
    }

    // If there are validation errors, set them and stop
    if (Object.keys(newErrors).length > 0) {
      setErrorMessage((prev) => ({
        ...prev,
        ...newErrors,
      }));
      return;
    }

    const res = await updateProfile(formData);

    if (res) resetData();
  };

  const handlePasswordSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage({ ...userData, currentPassword: "", newPassword: "" });

    const { currentPassword, newPassword, confirmPassword } = passwordData;
    const newErrors: Partial<typeof errorMessage> = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Please enter your current password";
    }

    if (!newPassword) {
      newErrors.newPassword = "Please enter your new password";
    }

    if (newPassword.length < 7) {
      newErrors.newPassword = "Password must be at least 7 characters long";
    }

    if (newPassword !== confirmPassword) {
      newErrors.newPassword = "Passwords do not match";
    }

    // If there are any errors, set them
    if (Object.keys(newErrors).length > 0) {
      setErrorMessage((prev) => ({
        ...prev,
        ...newErrors,
      }));
      return;
    }

    // backend needs to verify old password, if incorrect return error and set error message
    // Call API to change password

    resetData();
  };

  const resetData = () => {
    setErrorMessage({ ...userData, currentPassword: "", newPassword: "" });
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordForm(false);
    setEditMode(false);
  };

  return (
    <Box
      sx={{ padding: "5rem 2rem", display: "flex", justifyContent: "center" }}
    >
      {!editMode ? (
        <Box
          sx={{
            height: "350px",
            width: { xs: "100%", md: "80%" },
            borderRadius: "20px",
            mb: 4,
            border: "1px solid var(--note-border)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <Typography sx={{ color: "var(--text-primary)" }}>
              Personal Info
            </Typography>
            <Button
              onClick={() => setEditMode(true)}
              variant="outlined"
              sx={{
                color: "var(--text-primary)",
                borderColor: "var(--text-secondary)",
                borderRadius: "7px",
                height: "30px",
                fontSize: "0.7rem",
                p: "7px",
              }}
            >
              Edit
              <EditNoteRoundedIcon
                sx={{ pl: 0.5, width: "fit-content", fontSize: "1.3rem" }}
              />
            </Button>
          </Box>
          <Divider variant="middle" sx={{ borderColor: "var(--divider)" }} />
          <Box
            sx={{
              p: { xs: 2, md: 3 },
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                gap: 5,
              }}
            >
              <Box sx={{ p: { xs: "15px 30px", md: "15px 50px" } }}>
                <Typography sx={{ color: "var(--text-primary)" }}>
                  First Name:
                </Typography>
                <Typography sx={{ color: "var(--text-secondary)" }}>
                  {formData.firstName}
                </Typography>
              </Box>
              <Box sx={{ p: { xs: "15px 30px", md: "15px 50px" } }}>
                <Typography sx={{ color: "var(--text-primary)" }}>
                  Last Name:
                </Typography>
                <Typography sx={{ color: "var(--text-secondary)" }}>
                  {formData.lastName}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ p: { xs: "15px 30px", md: "15px 50px" } }}>
              <Typography sx={{ color: "var(--text-primary)" }}>
                Email
              </Typography>
              <Typography sx={{ color: "var(--text-secondary)" }}>
                {formData.email}
              </Typography>
            </Box>
            <Box sx={{ p: { xs: "15px 30px", md: "15px 50px" } }}>
              <Typography sx={{ color: "var(--text-primary)" }}>
                Phone
              </Typography>
              <Typography sx={{ color: "var(--text-secondary)" }}>
                {formData.phone}
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : !showPasswordForm ? (
        // Edit Form
        <form onSubmit={handleSave} style={{ width: "100%", maxWidth: 600 }}>
          <Typography sx={{ color: "var(--text-primary)", mb: 7 }}>
            Edit Personal Info
          </Typography>
          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}
          >
            <TextField
              error={errorMessage.firstName !== ""}
              helperText={errorMessage.firstName}
              id="first-name"
              label="*First Name"
              variant="outlined"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleDataChange}
            />
            <TextField
              error={errorMessage.lastName !== ""}
              helperText={errorMessage.lastName}
              id="last-name"
              label="*Last Name"
              variant="outlined"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleDataChange}
            />
          </Box>
          <TextField
            error={errorMessage.email !== ""}
            helperText={errorMessage.email}
            id="email"
            label="*Email"
            variant="outlined"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleDataChange}
            sx={{ width: "100%", mt: 2 }}
          />
          <TextField
            error={errorMessage.phone !== ""}
            helperText={errorMessage.phone}
            id="phone-number"
            label="Phone Number"
            variant="outlined"
            type="tel"
            name="phone"
            placeholder="e.g format 1234567890"
            value={formData.phone}
            onChange={handleDataChange}
            sx={{ width: "100%", mt: 2 }}
          />

          <Box
            sx={{
              gap: 2,
              mt: 1,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button sx={{ textTransform: "none" }} onClick={() => resetData()}>
              Cancel
            </Button>
            <Button type="submit" sx={{ textTransform: "none" }}>
              Update
            </Button>
          </Box>
          <Divider sx={{ borderColor: "var(--divider)", mt: 3 }} />
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "var(--text-secondary)" }}>
              Password
            </Typography>
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => setShowPasswordForm(true)}
            >
              Change
            </Button>
          </Box>
          {/*//TODO: create delete account logic*/}
          {/* <Box
            sx={{
              border: "1px solid var(--note-border)",
              borderRadius: "10px",
              mt: 2,
              p: 2,
              backgroundColor: "var(--bg-default)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Button sx={{ p: 0, fontSize: ".7rem" }}>Delete my account</Button>
            <Typography
              sx={{ fontSize: ".7rem", color: "var(--text-secondary)" }}
            >
              Please note, this will permanently delete your account
            </Typography>
          </Box> */}
        </form>
      ) : (
        // Password Form
        <form
          onSubmit={handlePasswordSave}
          style={{ width: "100%", maxWidth: 600 }}
        >
          <Typography sx={{ color: "var(--text-primary)", mb: 5 }}>
            Change Password
          </Typography>
          <TextField
            type={visiblePassword ? "text" : "password"}
            error={errorMessage.currentPassword !== ""}
            helperText={errorMessage.currentPassword}
            placeholder="Old Password"
            value={passwordData.currentPassword}
            name="currentPassword"
            onChange={handlePasswordChange}
            sx={{ width: "100%", mt: 2 }}
          />
          <TextField
            type={visiblePassword ? "text" : "password"}
            error={errorMessage.newPassword !== ""}
            helperText={errorMessage.newPassword}
            placeholder="New Password"
            value={passwordData.newPassword}
            name="newPassword"
            onChange={handlePasswordChange}
            sx={{ width: "100%", mt: 2 }}
          />
          <TextField
            type="password"
            error={errorMessage.newPassword !== ""}
            helperText={errorMessage.newPassword}
            placeholder="Confirm New Password"
            value={passwordData.confirmPassword}
            name="confirmPassword"
            onChange={handlePasswordChange}
            sx={{ width: "100%", mt: 2 }}
          />

          <Box
            sx={{
              gap: 2,
              mt: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => setVisiblePassword(!visiblePassword)}
              sx={{
                color: "var(--color-primary-main)",
                display: "flex",
                gap: 1,
                width: "fit-content",
                textTransform: "none",
              }}
            >
              Show password
              {visiblePassword ? (
                <VisibilityOffIcon sx={{ fontSize: "1.5rem" }} />
              ) : (
                <VisibilityIcon sx={{ fontSize: "1.5rem" }} />
              )}
            </Button>
            <Box>
              <Button
                onClick={() => resetData()}
                // onClick={() => setShowPasswordForm(false)} // would need to reset password data too
                sx={{ textTransform: "none" }}
              >
                Cancel
              </Button>
              <Button type="submit" sx={{ textTransform: "none" }}>
                Update
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Box>
  );
}
