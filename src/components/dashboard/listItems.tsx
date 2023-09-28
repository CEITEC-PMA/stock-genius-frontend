'use client'
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { List, Person, PersonAddAlt1 } from '@mui/icons-material';
import { useRouter } from 'next/navigation'
import Icon from '@mui/material/Icon';

interface IListItemsProps {
  label: string
  to: string
  icon: string

}


export default function ListItems({ label, to, icon }: IListItemsProps) {

  const router = useRouter()
  const handleNavigation = () => {
    router.push(to);

  }

  return (
    <ListItemButton onClick={handleNavigation}>
      <ListItemIcon>
        <Icon>
          {icon === 'PersonAddAlt1' ? <PersonAddAlt1 /> : icon === ' List' ? < List /> : null}
        </Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>

  )
}

// export const mainListItems = (
//   <React.Fragment>
//     <ListItemButton>
//       <ListItemIcon onClick={() => handleNavigation('/dashboard')}>
//         <PersonAddAlt1 />
//       </ListItemIcon>
//       <ListItemText primary="Candidatar" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <List />
//       </ListItemIcon>
//       <ListItemText primary="Listar Candidatos" />
//     </ListItemButton>
//   </React.Fragment>
// );
