import { Add, MoreHoriz } from "@mui/icons-material";
import {
  AvatarGroup,
  Box,
  Button,
  Card,
  IconButton,
  LinearProgress,
} from "@mui/material";
import AppAvatar from "components/avatars/AppAvatar";
import FlexBetween from "components/flexbox/FlexBetween";
import FlexBox from "components/flexbox/FlexBox";
import { H3, H6, Paragraph, Small } from "components/Typography";
import { useRouter } from "next/router";

const ProjectCard2 = ({ handleMoreClick, name }) => {
  const { push } = useRouter();
  return (
    <Card
      sx={{
        padding: 2,
      }}
    >
      <FlexBetween>
        <Small>July 2, 2020</Small>
        <IconButton
          sx={{
            padding: 0,
          }}
          onClick={handleMoreClick}
        >
          <MoreHoriz />
        </IconButton>
      </FlexBetween>

      <Box
        sx={{
          textAlign: "center",
          pt: 6,
          pb: 4,
          cursor: "pointer",
        }}
        onClick={() => push("/projects/project-details")}
      >
        <H3>{name}</H3>
        <H6 color="text.secondary" fontWeight={500} mt={0.5}>
          Prototyping
        </H6>
      </Box>

      <FlexBetween py={1}>
        <Paragraph fontWeight={600}>Project Progress</Paragraph>
        <Paragraph fontWeight={600}>32%</Paragraph>
      </FlexBetween>

      <LinearProgress variant="determinate" value={32} />

      <FlexBetween pt="1.5rem">
        <FlexBox alignItems="center" gap={1}>
          <AvatarGroup>
            <AppAvatar alt="Remy Sharp" src="/static/avatar/001-man.svg" />
            <AppAvatar alt="Travis Howard" src="/static/avatar/002-girl.svg" />
          </AvatarGroup>

          <Button variant="dashed">
            <Add
              fontSize="small"
              sx={{
                color: "grey.600",
              }}
            />
          </Button>
        </FlexBox>

        <Small
          sx={{
            marginLeft: 1,
            padding: "5px 15px",
            borderRadius: "20px",
            color: "text.secondary",
            backgroundColor: "action.hover",
          }}
        >
          3 Weeks Left
        </Small>
      </FlexBetween>
    </Card>
  );
};

export default ProjectCard2;
