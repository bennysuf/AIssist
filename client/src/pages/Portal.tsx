import { Height } from "@mui/icons-material";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Grid,
  SettingsRoundedIcon,
  EditRoundedIcon,
  VpnKeyRoundedIcon,
  ChatBubbleOutlineRoundedIcon,
  AutoAwesomeRoundedIcon,
  SmartToyOutlinedIcon,
} from "../util/muiExports";
import { useUserStore } from "../util/stores/userStore";

function Portal() {
  const user = useUserStore((state) => state.user);

  return (
    <Box sx={{}}>
      {(user?.assistants ?? []).length < 1 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            height: { xs: "85dvh", sm: "90dvh" },
            marginTop: { xs: "1rem", sm: "3rem" },
            padding: "10px",
          }}
        >
          <Box
            sx={{
              width: { xs: 50, sm: 100 },
              height: { xs: 50, sm: 100 },
              borderRadius: "50%",
              backgroundColor: "var(--color-secondary-main)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <SmartToyOutlinedIcon
              sx={{ height: { sm: "50px" }, width: "auto" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              maxWidth: "500px",
              padding: 2,
            }}
          >
            <Typography variant="h6">No AIssitant Bots Yet</Typography>
            <Typography>
              Create your first AI bot to get started. Configure prompts, manage
              API keys, and unlock the power of AI automation.
            </Typography>

            <Button
              variant="contained"
              color="primary"
              sx={{
                margin: "2rem",
                boxShadow: "none",
                height: "3rem",
                width: "220px",
                fontSize: "1em",
                backgroundColor: "var(--color-secondary-main)",
                borderRadius: "10px",
                textTransform: "none",
              }}
            >
              + create your first bot
            </Button>
          </Box>

          <Box sx={{ position: "absolute", bottom: { xs: 0, sm: 20 } }}>
            <Paper
              elevation={0}
              sx={{
                bgcolor: "var(--bg-default)",
                height: "100px",
                width: "220px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "10px",
                position: "relative",
              }}
            >
              <VpnKeyRoundedIcon
                sx={{
                  transform: "rotate(315deg)",
                  position: "absolute",
                  top: 10,
                  left: 15,
                  color: "var(--color-secondary-light)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 35,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2">API Integration</Typography>
                <Typography variant="caption">
                  Securely manage your API keys
                </Typography>
              </Box>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                bgcolor: "var(--bg-default)",
                height: "100px",
                width: "220px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "10px",
                position: "relative",
                marginTop: "1rem",
              }}
            >
              <ChatBubbleOutlineRoundedIcon
                sx={{
                  position: "absolute",
                  top: 10,
                  left: 15,
                  color: "var(--color-secondary-light)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 35,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2">Custom Prompts</Typography>
                <Typography variant="caption">
                  Create tailored AI interactions
                </Typography>
              </Box>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                bgcolor: "var(--bg-default)",
                height: "100px",
                width: "220px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "10px",
                position: "relative",
                marginTop: "1rem",
              }}
            >
              <AutoAwesomeRoundedIcon
                sx={{
                  position: "absolute",
                  top: 10,
                  left: 15,
                  color: "var(--color-secondary-light)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 35,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2">Smart Automation</Typography>
                <Typography variant="caption">
                  Streamline your workflows
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      ) : (
        <Grid
          container
          direction="row"
          sx={{
            justifyContent: { xs: "center", sm: "flex-start" },
            alignItems: "flex-end",
            gap: "1em",
            marginTop: "1em",
          }}
        >
          {user!.assistants?.map((assistant, index) => {
            const { apiKey, companyName, role, prompts } = assistant;
            return (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  bgcolor: "var(--bg-default)",
                  margin: "1rem",
                  borderRadius: "20px",
                  maxWidth: "500px",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    margin: ".5rem",
                    borderRadius: "16px",
                    padding: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "3px",
                    }}
                  >
                    <Typography variant="subtitle2">{role}</Typography>
                    <Typography variant="caption" sx={{ lineHeight: "10px" }}>
                      {companyName}
                    </Typography>
                  </Box>
                  <Typography sx={{ marginTop: "10px", marginLeft: "3px" }}>
                    API key
                  </Typography>
                  <Box
                    sx={{
                      padding: "10px 14px",
                      border: "1px solid #ccc",
                      borderRadius: "16px",
                      fontSize: "1rem",
                      color: "text.primary",
                      backgroundColor: "background.paper",
                    }}
                  >
                    {"*".repeat(apiKey.length)}
                  </Box>
                  <Button>
                    <SettingsRoundedIcon /> Configure
                  </Button>
                </Paper>
                <Paper
                  elevation={0}
                  sx={{
                    margin: ".5rem",
                    borderRadius: "16px",
                    padding: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography>Prompt</Typography>
                    <Button>
                      {/* // TODO: create edit logic */}
                      <EditRoundedIcon />
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      padding: "10px 14px",
                      border: "1px solid #ccc",
                      borderRadius: "16px",
                      fontSize: "1rem",
                      color: "text.primary",
                      backgroundColor: "background.paper",
                      minHeight: "100px",
                    }}
                  >
                    {prompts.length >= 1 &&
                      prompts.map((prompt, index) => {
                        return (
                          <Typography key={index}>
                            {prompt.promptText}
                          </Typography>
                        );
                      })}
                  </Box>
                </Paper>
              </Paper>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}

export default Portal;
