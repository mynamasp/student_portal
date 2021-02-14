import React from "react";
import ReactDOM from 'react-dom';
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import PropTypes from "prop-types";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SwipeableViews from "react-swipeable-views";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
         {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: "#fff"
    }
  }
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#fff",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: "1.2rem",
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1
    }
  }
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  padding: {
    padding: theme.spacing(3)
  }
}));

function CustomizedTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  document.body.style.background = "#de4328";
  return (
    <div className={classes.root} style={{overflow: "hidden"}}>
      <div className={classes.demo2}>
        <StyledTabs value={value} onChange={handleChange} centered>
          <StyledTab label="Home" />
          <StyledTab label="Test" />
          <StyledTab label="Assignments" />
        </StyledTabs>

        <Typography className={classes.padding} />
      </div>
      <SwipeableViews
        
        index={value}
        onChangeIndex={handleChange}
      >
        <TabPanel value={value} index={0}>
          {props.Tab1}
        </TabPanel>
        <TabPanel value={value} index={1}>
        {props.Tab2}
        </TabPanel>
        <TabPanel value={value} index={2}>
        {props.Tab3}
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

function SubjectBox(props){
    
    const code = ['1234','2132'];
    const topic = ['P-Block Element','Surface Chemistry']
    const date = ['5 Nov','10 Nov']
    const type = ['Test','Test']
    const marks = ['30','30']
return(
    
  <div>
  {code.map((code, codeIndex) => {
      console.log(code);
      console.log(date[codeIndex]);
      return (
        <div className="card" value={code}>
        <div className="flex-container">
        <div className="details">
          {date[codeIndex]}<br/>
          {type[codeIndex]} <br/>
          {marks[codeIndex]}
          </div>
          <div className="topic">
          {topic[codeIndex]}
          </div>
          </div>
          </div>

    )
  })}
  </div>
)
}



ReactDOM.render(<CustomizedTabs Tab1={<SubjectBox/>} Tab2={<SubjectBox/>} Tab3={<SubjectBox/>}/>,document.getElementById("root"));

