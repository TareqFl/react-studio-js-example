import { Add } from "@mui/icons-material";
import { AvatarGroup, Button, Card } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import AppAvatar from "components/avatars/AppAvatar";
import FlexBetween from "components/flexbox/FlexBetween";
import FlexBox from "components/flexbox/FlexBox";
import { H3, Small } from "components/Typography";
import Link from "next/link";

const ProjectCard3 = ({ project }) => {
  const { title, cover, duration, status } = project;

  const theme = useTheme();
  return (
    <Link href={`/podcasts/podcast-details/${title}`}>
      <Card>
        <Box
          sx={{
            height: 165,
            margin: "1rem",
            borderRadius: "8px",
            overflow: "hidden",
            "& img": {
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          }}
        >
          <img src={cover} alt={title} />
        </Box>

        <Box padding={2} paddingTop={0}>
          <H3 mb={1}>{title}</H3>
          {/* <Small color="text.secondary" fontWeight={500} mb={2}>
            {project.description}
            
          </Small> */}

          <FlexBetween flexWrap="wrap" pt="1rem">
            {/* <FlexBox alignItems="center" gap={1}>
              <AvatarGroup>
                <AppAvatar alt="Remy Sharp" src={project.teamMember[0]} />
                <AppAvatar alt="Travis Howard" src={project.teamMember[1]} />
              </AvatarGroup>

              <Button variant="dashed">
                <Add
                  fontSize="small"
                  sx={{
                    color: "grey.600",
                  }}
                />
              </Button>
            </FlexBox>  */}

            <Small
              sx={{
                backgroundColor: "action.hover",
                padding: "5px 15px",
                borderRadius: "20px",
                color: "text.secondary",
                [theme.breakpoints.between(960, 1050)]: {
                  marginTop: 1,
                  width: "100%",
                  textAlign: "center",
                },
              }}
            >
              {duration}
            </Small>
            <Small
              sx={{
                backgroundColor: "action.hover",
                padding: "5px 15px",
                borderRadius: "20px",
                color: "text.secondary",
                [theme.breakpoints.between(960, 1050)]: {
                  marginTop: 1,
                  width: "100%",
                  textAlign: "center",
                },
              }}
            >
              {status}
            </Small>
          </FlexBetween>
        </Box>
      </Card>
    </Link>
  );
};

export default ProjectCard3;
