import React, { useState } from 'react';
import { Avatar, Grid } from '@material-ui/core';
import { AiFillHome, AiTwotonePhone, IoIosArrowDown, IoIosArrowUp, MdEmail } from 'react-icons/all';
import Button from 'components/common/button/pureButton/Button';
import useStyles from 'pages/CourseDetailv2/styles/Instructor.styles';
import parse from 'html-react-parser';

const Instructor = ({lecturer}) => {
  const {fullName, address, email, avatar, description, phone} = lecturer;
  const [more, setMore] = useState(false);
  const classes = useStyles();
  const renderDescription = (description) => {
    return typeof (description) === 'string' ? parse(description) : description;
  };

  return (
    <Grid container>
      <Grid item xs={12}>
          <h5 className={classes.name}>{fullName}</h5>
      </Grid>
      <Grid item style={{ display: 'inline', padding: 2 }}>
        <Avatar
          alt="avatar"
          style={{ width: 100, height: 100, }}
          src={avatar}
        >
          {fullName.charAt(0)}
        </Avatar>
      </Grid>
      <Grid item style={{ display: 'flex' }}>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
          className="p-2 ml-2"
          style={{ fontSize: '15px' }}
        >
          <Grid item> <MdEmail/> &nbsp; {email}</Grid>
          <Grid item> <AiTwotonePhone/> &nbsp; {phone}</Grid>
          <Grid item> <AiFillHome/> &nbsp; {address}</Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className="my-3">
        <div className={more ? classes.descMore : classes.descLess}>
          {renderDescription(description)}
        </div>
        <Button className={classes.readBtn} onClick={() => setMore(!more)}>
          {more ? (
            <>
              Show less&nbsp;
              <IoIosArrowUp style={{fontSize: 'smaller'}}/>
            </>
          ) : (
            <>
              Show more&nbsp;
              <IoIosArrowDown style={{fontSize: 'smaller'}}/>
            </>
          )}
        </Button>
      </Grid>
    </Grid>
  )
};

export default Instructor;
