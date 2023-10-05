'use client'
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { List, Person, PersonAddAlt1 } from '@mui/icons-material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useRouter } from 'next/navigation'
import Icon from '@mui/material/Icon';
interface IListItemsProps {
  label: string
  to: string
  icon: any

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
          {icon}
        </Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>

  )
}

