import React from 'react';

import './CourseCard.css';
import CourseRating from '../../rating/CourseRating';
import { convertNumberWithComma } from '../../../../utils/commonUtils';
import { useHistory } from 'react-router-dom';

export default function CourseCard({ courseData, className, style }) {
  const classes = 'card border-0 course-card ' + className;
  const history = useHistory();

  function handleClick() {
    history.push(`/courses/${courseData._id}`);
  }

  const renderPrice = ({ price, promotionalPrice }) => {
    if (promotionalPrice < price) {
      return (
        <div>
          {convertNumberWithComma(promotionalPrice)}vnd
          &nbsp;
          <span style={{
            fontSize: 'smaller',
            fontWeight: 'normal',
            textDecoration: 'line-through',
            color: '#696969'
          }}>
            {convertNumberWithComma(price)}vnd
          </span>
        </div>
      );
    } else {
      return (
        <div>
          {convertNumberWithComma(price)}vnd
        </div>
      );
    }
  };

  return (
    <div className={classes} style={style}>
      <button className='pure-button p-0 text-left' style={{ color: '#454545' }} onClick={handleClick}>
        <div className='image-wrapper'>
          <img className='card-img-top h-100' src={courseData.courseImage} alt='courseImage.jpg' />
        </div>
        <div className='card-body p-0 py-2'>
          <div className='course-title font-weight-bold'>
            {courseData.courseName}
          </div>
          <div className='course-category'>{courseData.category.categoryName}</div>
          <div className='course-lecture'>{courseData.courseLecturers[0].fullName}</div>
          <CourseRating ratingPoint={courseData.ratingPoint}
                        ratedNumber={courseData.feedbacks ? courseData.feedbacks.length : 0} />
          <div className='course-price font-weight-bold'>{renderPrice(courseData)}</div>
        </div>
      </button>
    </div>
  );
}
