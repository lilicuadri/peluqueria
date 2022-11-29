import Icon from '@mui/material/Icon'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { selectMainTheme } from 'app/store/fuse/settingsSlice'
import React from 'react';

let Interface = "";
function HeadderSimple(props) {
 Interface = JSON.parse(localStorage.getItem('Interface'));
  const dispatch = useDispatch();
  /* const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText); */
  const mainTheme = useSelector(selectMainTheme);

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <Icon
          component={motion.span}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.2 } }}
          className="text-32"
        >
        {Interface ? Interface.icon : ""} 
        </Icon>
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="hidden sm:flex mx-0 sm:mx-12 ml-3" variant="h4"
        >
          {Interface ? Interface.translate : ""}  
        </Typography>
      </div>
    </div>
  );
}

export default React.memo(HeadderSimple);