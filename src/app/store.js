import { configureStore } from "@reduxjs/toolkit";
import RegistrationFormReducer from '../slices/registrationFormSlice'
import MajorSlice from '../slices/MajorSlice'
import EvaluationSlice from '../slices/EvaluationSlice'
import AcademicsSlice from '../slices/AcademicSlide'
import CollegeExamGroupsSlice from '../slices/CollegeExamGroupSlice'
import NewsSlice from '../slices/NewsSlide'
import AdmissionRegisterSlice from "../slices/AdmissionRegisterSlice";
import BusinessSlice from "../slices/BusinessSlice";
import FeedBackSlide from "../slices/FeedBackSlide";
import TokenAppSlice from "../slices/tokenSlice";
import NotificationSlice from "../slices/NotificationSlice";
import AlertSlice from "../slices/AlertSlice";
import MediaSlice from "../slices/MediaSlice";  
import LocationSlice from "../slices/LocationSlice";  
import ConfigSlice from "../slices/ConfigSlice";  
import HandbookSlice from "../slices/HandbookSlide";  
import ContactSlice from "../slices/ContactSlide";  



export const store = configureStore({
  reducer: {
    alertReducer: AlertSlice,
    registrationFormReducer: RegistrationFormReducer,
    majorReducer: MajorSlice,
    evaluationReducer: EvaluationSlice,
    academicsReducer: AcademicsSlice,
    collegeExamGroupsReducer: CollegeExamGroupsSlice,
    admissionRegisterReducer: AdmissionRegisterSlice,
    newsReducer: NewsSlice, 
    businessesReducer: BusinessSlice, 
    feedbacksReducer: FeedBackSlide, 
    tokenReducer: TokenAppSlice, 
    notificationReducer: NotificationSlice, 
    mediaReducer: MediaSlice, 
    locationReducer: LocationSlice, 
    configReducer: ConfigSlice, 
    handbookReducer: HandbookSlice, 
    contactReducer: ContactSlice, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})
