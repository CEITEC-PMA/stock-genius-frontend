import { Divider, IconButton, List, Toolbar, styled } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { PersonAddAlt1, AccountBox } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import ListItems from "./listItems";
import Face6Icon from "@mui/icons-material/Face6";
import { useUserContext } from "@/userContext";
import useTimeCheck from "@/hooks/useTimeCheck";
import GroupIcon from "@mui/icons-material/Group";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import PollIcon from "@mui/icons-material/Poll";
import ReplyIcon from "@mui/icons-material/Reply";
import DescriptionIcon from "@mui/icons-material/Description";
import BadgeIcon from "@mui/icons-material/Badge";
import { usePathname } from "next/navigation";

//import { mainListItems } from "./ListItems";
interface DrawerProps {
  open: boolean;
  toggleDrawer: () => void;
  drawerWidth: number;
}

export default function DrawerComponent({
  open,
  toggleDrawer,
  drawerWidth,
}: DrawerProps) {
  const { user } = useUserContext();
  const pathname = usePathname();
  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  const isBeforeDeadline = useTimeCheck();
  console.log(pathname);

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>

      <Divider />

      <List component="nav">
        {isBeforeDeadline && (
          <ListItems
            label="Registrar Candidato"
            icon={<PersonAddAlt1 />}
            to="/dashboard/candidato/register"
            isActive={pathname === "/dashboard/candidato/register"}
          />
        )}

        <ListItems
          label="Liberar voto"
          icon={<HowToVoteIcon />}
          to="/dashboard/liberavoto"
          isActive={pathname === "/dashboard/liberavoto"}
        />

        <ListItems
          label="Lista de Candidatos"
          icon={<AccountBox />}
          to="/dashboard/data"
          isActive={pathname === "/dashboard/data"}
        />

        <ListItems
          label="Lista de Alunos"
          icon={<Face6Icon />}
          to="/dashboard/alunos"
          isActive={pathname === "/dashboard/alunos"}
        />
        <ListItems
          label="Lista de Funcionários"
          icon={<BadgeIcon />}
          to="/dashboard/funcionarios"
          isActive={pathname === "/dashboard/funcionarios"}
        />

        <ListItems
          label="Atas"
          icon={<DescriptionIcon />}
          to="/dashboard/atas"
          isActive={pathname === "/dashboard/atas"}
        />

        {user.role?.includes("super-adm") && (
          <ListItems
            label="Apuração dos votos"
            icon={<PollIcon />}
            to="/dashboard/buscaApuracao"
            isActive={pathname === "/dashboard/buscaApuracao"}
          />
        )}

        {user.role?.includes("super-adm") && (
          <ListItems
            label="Lista Completa - ADM"
            icon={<GroupIcon />}
            to="/dashboard/dataAdm"
            isActive={pathname === "/dashboard/dataAdm"}
          />
        )}

        {user.role?.includes("super-adm") && (
          <ListItems
            label="Redefinição de senha"
            icon={<RotateLeftIcon />}
            to="/dashboard/settings"
            isActive={pathname === "/dashboard/settings"}
          />
        )}
      </List>
    </Drawer>
  );
}
