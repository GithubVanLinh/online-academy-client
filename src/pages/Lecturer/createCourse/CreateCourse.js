import React, {useContext} from 'react';
import 'react-quill/dist/quill.snow.css';
import StepOne from "./step/StepOne";
import StepTwo from "./step/StepTwo";
import {createCourseContext} from "../../../provider/createCourseProvider";
import {Redirect, Route, Switch} from "react-router-dom";
import UploadVideo from "./step/UploadVideo";
import UploadVideoProvider from "../../../provider/uploadVideoProvider";

function CreateCourse({className}) {
  const {state} = useContext(createCourseContext);
  const classes = "create-course " + (className ? className : "");
  return (
    <div className={classes}>
      <h3 className="text-center font-weight-bold text-monospace mb-4">
        Step {state.currentStep} of {state.totalStep}
      </h3>
      <Switch>
        <Route path="/lecturer/create-course/1">
          <h4 className="text-center font-weight-bold text-monospace">
            Basic information
          </h4>
          <StepOne/>
        </Route>
        <Route path="/lecturer/create-course/2">
          {state.course ? (
            <>
              <h4 className="text-center font-weight-bold text-monospace">
                Upload course image
              </h4>
              <StepTwo/>
            </>
          ) : (
            <Redirect
              to={{
                pathname: "/lecturer/create-course/1",
              }}/>
          )}
        </Route>
        <Route path="/lecturer/create-course/3">
          {state.course ? (
            <>
              <h4 className="text-center font-weight-bold text-monospace">
                Upload videos
              </h4>
              <UploadVideoProvider>
                <UploadVideo courseId={state.course._id} className="mt-5"/>
              </UploadVideoProvider>

              {/*<div className="text-center">*/}
              {/*  <button className="pure-button btn-dark">Done</button>*/}
              {/*</div>*/}
            </>
          ) : (
            <Redirect
              to={{
                pathname: "/lecturer/create-course/1",
              }}/>
          )}
        </Route>
        <Route path="/lecturer/create-course/*">
          404 not found
        </Route>
      </Switch>
    </div>
  );
}

export default CreateCourse;
