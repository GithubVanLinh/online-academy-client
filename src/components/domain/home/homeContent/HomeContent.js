import React, {useEffect, useState} from "react";
import Section from "../section/Section";
import CarouselList from "../../../common/list/carouselList/CarouselList";
import ButtonList from "../../../common/list/buttonList/ButtonList";
import academyApi from "../../../../services/academyApi";

const featuredCategories = [
  {
    categoryName: "HTML"
  },
  {
    categoryName: "CSS"
  },
  {
    categoryName: "JavaScript"
  },
  {
    categoryName: "Node.JS"
  },
  {
    categoryName: "React"
  },
  {
    categoryName: "Web Design"
  },
  {
    categoryName: "React Native"
  },
]

export default function HomeContent() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [latestCourses, setLatestCourses] = useState([]);
  const [mostViewedCourses, setMostViewedCourses] = useState([]);
  // const [featuredCategory, setFeaturedCategory] = useState([]);

  useEffect(() => {
    async function getFeaturedCoursesFromApi() {
      const courses = await academyApi.getFeaturedCourses();
      console.log({featuredCourses: courses});
      setFeaturedCourses(courses);
    }

    async function getLatestCoursesFromApi() {
      const courses = await academyApi.getLatestCourses();
      console.log({latestCourses: courses});
      setLatestCourses(courses);
    }

    async function getMostViewedCoursesFromApi() {
      const courses = await academyApi.getMostViewedCourses();
      setMostViewedCourses(courses);
    }

    // async function getFeaturedCategoryFromApi() {
    //   const courses = await getFeaturedCourses();
    //   setFeaturedCategory(courses);
    // }
    getFeaturedCoursesFromApi();
    getLatestCoursesFromApi();
    getMostViewedCoursesFromApi();
  }, []);

  return (
    <div className='container-fluid flex-fill'>
      <div className='row'>
        <div className='col-8 m-auto'>
          {/* Top featured courses */}
          <Section title='Featured Courses' className='mt-4'>
            <CarouselList courseList={featuredCourses} className='mt-3'/>
          </Section>

          {/* Latest courses */}
          <Section title='Latest Courses' className='mt-4'>
            <CarouselList courseList={latestCourses} className='mt-3'/>
          </Section>

          {/* Most viewed courses */}
          <Section title='Most Viewed Course' className='mt-4'>
            <CarouselList courseList={mostViewedCourses} className='mt-3'/>
          </Section>

          {/*/!* Top featured category *!/*/}
          <Section title='Featured Category' className='mt-4'>
            <ButtonList
              className='mt-3'
              titleList={featuredCategories.map(e => e.categoryName)}/>
          </Section>

        </div>
      </div>
    </div>
  );
}