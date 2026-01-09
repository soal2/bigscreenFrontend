import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 标记，避免重复进入相同路由时的报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/index",
    name: "Index",
    component: () => import("@/views/bigScreen/dataAnalysis/index.vue"),
  },
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: "/UpdateData",
    name: "UpdateData",
    component: () => import("@/views/bigScreen/dataAnalysis/updateData.vue"),
  },


  {
    path: "/BigScreen-GraduateStudent1",
    name: "BigScreen-GraduateStudent1",
    component: () => import("@/views/bigScreen/dataAnalysis/bigScreenGraduateStudent1.vue"),
  },
  {
    path: "/GraduateStudent-NationalityDetail",
    name: "GraduateStudent-NationalityDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/graduateStudentComponents/nationalityDetail.vue"),
  },
  {
    path: "/GraduateStudent-PolityDetail",
    name: "GraduateStudent-PolityDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/graduateStudentComponents/polityDetail.vue"),
  },
  {
    path: "/GraduateStudent-StudentTypeDetail",
    name: "GraduateStudent-StudentTypeDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/graduateStudentComponents/studentTypeDetail.vue"),
  },
  {
    path: "/GraduateStudent-Top5SchoolStudentDetail",
    name: "GraduateStudent-Top5SchoolStudentDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/graduateStudentComponents/top5SchoolStudentDetail.vue"),
  },
  {
    path: "/GraduateStudent-CampusDetail",
    name: "GraduateStudent-CampusDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/graduateStudentComponents/campusDetail.vue"),
  },
  {
    path: "/GraduateStudent-SexDetail",
    name: "GraduateStudent-SexDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/graduateStudentComponents/sexDetail.vue"),
  },
  {
    path: "/GraduateStudent-Top5StudentHometownCityDetail",
    name: "GraduateStudent-Top5StudentHometownCityDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/graduateStudentComponents/top5StudentHometownCityDetail.vue"),
  },
  {
    path: "/GraduateStudent-Top5StudentHometownProvinceDetail",
    name: "GraduateStudent-Top5StudentHometownProvinceDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/graduateStudentComponents/top5StudentHometownProvinceDetail.vue"),
  },
  {
    path: "/GraduateStudent-SupervisorTitleAndAgeDetail",
    name: "GraduateStudent-SupervisorTitleAndAgeDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/graduateStudentComponents/supervisorTitleAndAgeDetail.vue"),
  },


  {
    path: "/BigScreen-GraduateStudent2",
    name: "BigScreen-GraduateStudent2",
    component: () => import("@/views/bigScreen/dataAnalysis/bigScreenGraduateStudent2.vue"),
  },
  {
    path: "/GraduateStudent-MasterGradeDetail",
    name: "GraduateStudent-MasterGradeDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/graduateStudentComponents/masterGradeDetail.vue"),
  },
  {
    path: "/GraduateStudent-PhdGradeDetail",
    name: "GraduateStudent-PhdGradeDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/graduateStudentComponents/phdGradeDetail.vue"),
  },
  {
    path: "/GraduateStudent-Recent5YearsEnrollDetail",
    name: "GraduateStudent-Recent5YearsEnrollDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/graduateStudentComponents/recent5YearsEnrollDetail.vue"),
  },
  {
    path: "/GraduateStudent-Top5Over4YearsUndergraduatePhdSchoolDetail",
    name: "GraduateStudent-Top5Over4YearsUndergraduatePhdSchoolDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/graduateStudentComponents/top5Over4YearsUndergraduatePhdSchoolDetail.vue"),
  },
  {
    path: "/GraduateStudent-Top5Over3YearsUndergraduateMasterSchoolDetail",
    name: "GraduateStudent-Top5Over3YearsUndergraduateMasterSchoolDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/graduateStudentComponents/top5Over3YearsUndergraduateMasterSchoolDetail.vue"),
  },



  {
    path: "/BigScreen-TeachingStaff",
    name: "BigScreen-TeachingStaff",
    component: () => import("@/views/bigScreen/dataAnalysis/bigScreenTeachingStaff.vue"),
  },
  {
    path: "/TeachingStaff-OnDutyStaffDetail",
    name: "TeachingStaff-OnDutyStaffDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/teachingStaffComponents/onDutyStaffDetail.vue"),
  },
  {
    path: "/TeachingStaff-CountryDetail",
    name: "TeachingStaff-CountryDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/teachingStaffComponents/countryDetail.vue"),
  },
  {
    path: "/TeachingStaff-TitleDetail",
    name: "TeachingStaff-TitleDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/teachingStaffComponents/titleDetail.vue"),
  },
  {
    path: "/TeachingStaff-Title15Detail",
    name: "TeachingStaff-Title15Detail",
    component: () => import("@/views/bigScreen/dataAnalysis/teachingStaffComponents/title15Detail.vue"),
  },
  {
    path: "/TeachingStaff-AgeDetail",
    name: "TeachingStaff-AgeDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/teachingStaffComponents/ageDetail.vue"),
  },
  {
    path: "/TeachingStaff-SexDetail",
    name: "TeachingStaff-SexDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/teachingStaffComponents/sexDetail.vue"),
  },
  {
    path: "/TeachingStaff-Recent5YearsEntryDetail",
    name: "TeachingStaff-Recent5YearsEntryDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/teachingStaffComponents/recent5YearsEntryDetail.vue"),
  },
  {
    path: "/TeachingStaff-Recent5YearsResignDetail",
    name: "TeachingStaff-Recent5YearsResignDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/teachingStaffComponents/recent5YearsResignDetail.vue"),
  },
  {
    path: "/TeachingStaff-EducationDetail",
    name: "TeachingStaff-EducationDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/teachingStaffComponents/educationDetail.vue"),
  },
  {
    path: "/TeachingStaff-Top5GraduationSchoolDetail",
    name: "TeachingStaff-Top5GraduationSchoolDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/teachingStaffComponents/top5GraduationSchoolDetail.vue"),
  },
  {
    path: "/TeachingStaff-Top5CityDetail",
    name: "TeachingStaff-Top5CityDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/teachingStaffComponents/top5CityDetail.vue"),
  },
  {
    path: "/TeachingStaff-Top5ProvinceDetail",
    name: "TeachingStaff-Top5ProvinceDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/teachingStaffComponents/top5ProvinceDetail.vue"),
  },


  {
    path: "/BigScreen-OrganizationalWork",
    name: "BigScreen-OrganizationalWork",
    component: () => import("@/views/bigScreen/dataAnalysis/bigScreenOrganizationalWork.vue"),
  },
  {
    path: "/OrganizationalWork-oCadreJobDetail",
    name: "OrganizationalWork-oCadreJobDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/organizationalWorkComponents/oCadreJobDetail.vue"),
  },
  {
    path: "/OrganizationalWork-oSjtDetail",
    name: "OrganizationalWork-oSjtDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/organizationalWorkComponents/oSjtDetail.vue"),
  },
  {
    path: "/OrganizationalWork-oCadreNumbersDetail",
    name: "OrganizationalWork-oCadreNumbersDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/organizationalWorkComponents/oCadreNumbersDetail.vue"),
  },
  {
    path: "/OrganizationalWork-oUnitNameDetail",
    name: "OrganizationalWork-oUnitNameDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/organizationalWorkComponents/oUnitNameDetail.vue"),
  },
  {
    path: "/OrganizationalWork-oCadreTypeDetail",
    name: "OrganizationalWork-oCadreTypeDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/organizationalWorkComponents/oCadreTypeDetail.vue"),
  },




  {
    path: "/BigScreen-PartyMember",
    name: "BigScreen-PartyMember",
    component: () => import("@/views/bigScreen/dataAnalysis/bigScreenPartyMember.vue"),
  },
  {
    path: "/partyMembberWork-oActiveTimeDetail",
    name: "partyMembberWork-oActiveTimeDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/partyMembberWorkComponents/oActiveTimeDetail.vue"),
  },
  {
    path: "/partyMembberWork-oJnTimeDetail",
    name: "partyMembberWork-oJnTimeDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/partyMembberWorkComponents/oJnTimeDetail.vue"),
  },
  {
    path: "/partyMembberWork-oPartyBranchTypesDetail",
    name: "partyMembberWork-oPartyBranchTypesDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/partyMembberWorkComponents/oPartyBranchTypesDetail.vue"),
  },
  {
    path: "/partyMembberWork-oJnTimeDetail",
    name: "partyMembberWork-oJnTimeDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/partyMembberWorkComponents/oJnTimeDetail.vue"),
  },
  {
    path: "/partyMembberWork-oActiveTop10Detail",
    name: "partyMembberWork-oActiveTop10Detail",
    component: () => import("@/views/bigScreen/dataAnalysis/partyMembberWorkComponents/oActiveTop10Detail.vue"),
  },
  {
    path: "/partyMembberWork-oPositiveTop5Detail",
    name: "partyMembberWork-oPositiveTop5Detail",
    component: () => import("@/views/bigScreen/dataAnalysis/partyMembberWorkComponents/oPositiveTop5Detail.vue"),
  },
  {
    path: "/partyMembberWork-oPartyTeacherDistribution",
    name: "partyMembberWork-oPartyTeacherDistribution",
    component: () => import("@/views/bigScreen/dataAnalysis/partyMembberWorkComponents/oPartyTeacherDistribution.vue"),
  },
  {
    path: "/partyMembberWork-oPartyTeacherDetail",
    name: "partyMembberWork-oPartyTeacherDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/partyMembberWorkComponents/oPartyTeacherDetail.vue"),
  },



  {
    path: "/BigScreen-ScientificResearch",
    name: "BigScreen-ScientificResearch",
    component: () => import("@/views/bigScreen/dataAnalysis/bigScreenScientificResearch.vue"),
  },
  {
    path: "/ScientificResearch-PlatformBaseLeadingNationalPlatformDetail3",
    name: "ScientificResearch-PlatformBaseLeadingNationalPlatformDetail3",
    component: () => import("@/views/bigScreen/dataAnalysis/scientificResearchCpmponents/platformBaseLeadingNationalPlatformDetail3.vue"),
  },
  {
    path: "/ScientificResearch-PlatformBaseParticipatingNationalPlatformDetail3",
    name: "ScientificResearch-PlatformBaseParticipatingNationalPlatformDetail3",
    component: () => import("@/views/bigScreen/dataAnalysis/scientificResearchCpmponents/platformBaseParticipatingNationalPlatformDetail3.vue"),
  },
  {
    path: "/ScientificResearch-PlatformBaseProvincialPlatformDetail3",
    name: "ScientificResearch-PlatformBaseProvincialPlatformDetail3",
    component: () => import("@/views/bigScreen/dataAnalysis/scientificResearchCpmponents/platformBaseProvincialPlatformDetail3.vue"),
  },
  {
    path: "/ScientificResearch-PlatformBaseProvincialBaseDetail3",
    name: "ScientificResearch-PlatformBaseProvincialBaseDetail3",
    component: () => import("@/views/bigScreen/dataAnalysis/scientificResearchCpmponents/platformBaseProvincialBaseDetail3.vue"),
  },
  {
    path: "/ScientificResearch-LeadingMajorProjectsTechnologySpecialProjectDetail3",
    name: "ScientificResearch-LeadingMajorProjectsTechnologySpecialProjectDetail3",
    component: () => import("@/views/bigScreen/dataAnalysis/scientificResearchCpmponents/leadingMajorProjectsTechnologySpecialProjectDetail3.vue"),
  },
  {
    path: "/ScientificResearch-LeadingMajorProjectsResearchAndDevelopmentProjectDetail3",
    name: "ScientificResearch-LeadingMajorProjectsResearchAndDevelopmentProjectDetail3",
    component: () => import("@/views/bigScreen/dataAnalysis/scientificResearchCpmponents/leadingMajorProjectsResearchAndDevelopmentProjectDetail3.vue"),
  },
  {
    path: "/ScientificResearch-NationalScienceFoundationDetail",
    name: "ScientificResearch-NationalScienceFoundationDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/scientificResearchCpmponents/nationalScienceFoundationDetail.vue"),
  },
  {
    path: "/ScientificResearch-NationalScienceFoundationDetail3",
    name: "ScientificResearch-NationalScienceFoundationDetail3",
    component: () => import("@/views/bigScreen/dataAnalysis/scientificResearchCpmponents/nationalScienceFoundationDetail3.vue"),
  },
  {
    path: "/ScientificResearch-NationalSocialFoundationDetail3",
    name: "ScientificResearch-NationalSocialFoundationDetail3",
    component: () => import("@/views/bigScreen/dataAnalysis/scientificResearchCpmponents/nationalSocialFoundationDetail3.vue"),
  },


  {
    path: "/ScientificResearch-ResearchProjectFundingDetail",
    name: "ScientificResearch-ResearchProjectFundingDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/scientificResearchCpmponents/researchProjectFundingDetail.vue"),
  },
  {
    path: "/ScientificResearch-ResearchProjectFundingDetail3", ///////////////////////
    name: "ScientificResearch-ResearchProjectFundingDetail3",
    component: () => import("@/views/bigScreen/dataAnalysis/scientificResearchCpmponents/researchProjectFundingDetail3.vue"),
  },

  {
    path: "/ScientificResearch-TechnologyAchievementAwardsNationalDetail3",
    name: "ScientificResearch-TechnologyAchievementAwardsNationalDetail3",
    component: () => import("@/views/bigScreen/dataAnalysis/scientificResearchCpmponents/technologyAchievementAwardsNationalDetail3.vue"),
  },
  {
    path: "/ScientificResearch-TechnologyAchievementAwardsProvincialDetail3",
    name: "ScientificResearch-TechnologyAchievementAwardsProvincialDetail3",
    component: () => import("@/views/bigScreen/dataAnalysis/scientificResearchCpmponents/technologyAchievementAwardsProvincialDetail3.vue"),
  },





  {
    path: "/BigScreen-DevelopmentPlanning",
    name: "BigScreen-DevelopmentPlanning",
    component: () => import("@/views/bigScreen/dataAnalysis/bigScreenDevelopmentPlanning.vue"),
  },
  {
    path: "/DevelopmentPlanning-ModelAdvancedStudentDetail",
    name: "DevelopmentPlanning-ModelAdvancedStudentDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/developmentPlanningComponets/modelAdvancedStudentDetail.vue"),
  },
  {
    path: "/DevelopmentPlanning-PublishedTextbooksDetail",
    name: "DevelopmentPlanning-PublishedTextbooksDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/developmentPlanningComponets/publishedTextbooksDetail.vue"),
  },
  {
    path: "/DevelopmentPlanning-NationalLevelCoursesDetail",
    name: "DevelopmentPlanning-NationalLevelCoursesDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/developmentPlanningComponets/nationalLevelCoursesDetail.vue"),
  },
  {
    path: "/DevelopmentPlanning-ProvincialTeachingAchievementAwardDetail",
    name: "DevelopmentPlanning-ProvincialTeachingAchievementAwardDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/developmentPlanningComponets/provincialTeachingAchievementAwardDetail.vue"),
  },
  {
    path: "/DevelopmentPlanning-TeacherVirtueCultivationDetail",
    name: "DevelopmentPlanning-TeacherVirtueCultivationDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/developmentPlanningComponets/teacherVirtueCultivationDetail.vue"),
  },
  {
    path: "/DevelopmentPlanning-ProvincialMinisterialScientificResearchPlatformDetail",
    name: "DevelopmentPlanning-ProvincialMinisterialScientificResearchPlatformDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/developmentPlanningComponets/provincialMinisterialScientificResearchPlatformDetail.vue"),
  },
  {
    path: "/DevelopmentPlanning-ScientificResearchNationalAwardsDetail",
    name: "DevelopmentPlanning-ScientificResearchNationalAwardsDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/developmentPlanningComponets/scientificResearchNationalAwardsDetail.vue"),
  },
  {
    path: "/DevelopmentPlanning-ScientificResearchProvincialAwardsDetail",
    name: "DevelopmentPlanning-ScientificResearchProvincialAwardsDetail",
    component: () => import("@/views/bigScreen/dataAnalysis/developmentPlanningComponets/scientificResearchProvincialAwardsDetail.vue"),
  },




];

const router = new VueRouter({
  mode: "hash", // hash模式
  base: '/',
  routes,
});

export default router;
