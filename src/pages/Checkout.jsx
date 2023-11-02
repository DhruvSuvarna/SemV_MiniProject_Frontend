import React from 'react'
import {Box, Stepper, Step, Button, StepLabel, Typography, Container, Grid} from '@mui/material';
import {styled} from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import {createTheme, ThemeProvider} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TodayIcon from '@mui/icons-material/Today';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const steps = [1, 2, 3, 4];
const defaultTheme = createTheme({
    palette: {
        primary: {
          main: '#45b45f',
        },
        secondary: {
          main: '#ffec1e',
        },
        tertiary: {
          main: '#0d5b2b',
        }
      },
});
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: 'linear-gradient( 95deg,#b3f221 0%,#1ab140 50%,#0ca339 100%)'
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: 'linear-gradient( 95deg,#b3f221 0%,#1ab140 50%,#0ca339 100%)'
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        borderRadius: 1,
        backgroundImage: 'linear-gradient( 95deg, #c1c1c1 0%,#9e9e9e 50%,#6a6a6a 100%)'
    },
  }));

  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundImage: 'linear-gradient( 136deg, #c1c1c1 0%,#9e9e9e 50%,#6a6a6a 100%)',
    zIndex: 1,
    color: '#fff',
    width: 55,
    height: 55,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage: 'linear-gradient( 136deg, #b3f221 0%,#1ab140 50%,#0ca339 100%)'
    }),
    ...(ownerState.completed && {
      backgroundImage: 'linear-gradient( 136deg, #b3f221 0%,#1ab140 50%,#0ca339 100%)'
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <ShoppingCartIcon fontSize='large'/>,
        2: <LocationOnIcon fontSize='large'/>,
        3: <TodayIcon fontSize='large'/>,
        4: <AccountBalanceWalletIcon fontSize='large'/>,
    };
  
    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <ThemeProvider theme={defaultTheme}>
        <Box sx={{ width: '100%'}}>
            <Box sx={{backgroundImage: 'linear-gradient(to top, transparent,#edffd0, #edffd0, #edffd0)', 
                pt:'10vh', pb: '5vh'}}>
                <Container sx={{px:'20vw !important'}}>
                    <Stepper nonLinear activeStep={activeStep} connector={<ColorlibConnector />}>
                        {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]} sx={{overflowY: 'hidden'}}>
                            <StepLabel StepIconComponent={ColorlibStepIcon} onClick={handleStep(index)}/>
                        </Step>
                        ))}
                    </Stepper>
                </Container>
            </Box>
            <Box>
                <Container>
                    {allStepsCompleted() ? (
                    <Box>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you're finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button variant="contained" onClick={handleReset}>Reset</Button>
                        </Box>
                    </Box>
                    ) : (
                    <Box>
                        <Grid container columnSpacing={3} sx={{ mt: 2, mb: 1, height: '90vh'}}>
                        {/* Step {activeStep + 1} */}
                            <Grid item xs={12} md={8}>
                                <Box sx={{height: '95%', border:'2px solid #d5d5d5', borderRadius:'3vh'}}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 5 , px: 5}}>
                                        <Button
                                            variant="contained"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1, color:'#fff'}}
                                        >
                                            Back
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button variant="contained" onClick={handleComplete} sx={{color:'#fff'}}>
                                            { activeStep === 3 ? 'Finish' : 'Next' }
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box sx={{height: '95%', border:'2px solid #d5d5d5',  borderRadius:'3vh'}}></Box>
                            </Grid>
                        </Grid>
                    </Box>
                    )}
                </Container>
            </Box>
        </Box>
    </ThemeProvider>
  );
}
