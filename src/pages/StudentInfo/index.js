import Profile from "../StudentInfo/sections/Profile"
import Posts from "../StudentInfo/sections/Posts"
import ProfilePageLayout from "glhfComponents/ProfilePageLayout";
// Student Profile
const StudentInfoPage = () => {

    return (
      <ProfilePageLayout>
        <Profile />
        <Posts />
      </ProfilePageLayout>
    );
  }


export default StudentInfoPage