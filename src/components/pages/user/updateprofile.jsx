import { useEffect, useState } from "react";
import Sidebar, { SidebarContainer } from "../../nav/sidebar";
export const UserUpdateProfile = () => {
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setIsloading(false);
    }, 3000);
  }, []);
  return (
    <>
      {isLoading === true ? (
        <>
          <Sidebar /> <div className="loader"></div>
        </>
      ) : (
        <>
          <Sidebar />
          <SidebarContainer>
            <h3>Update Profile</h3>
          </SidebarContainer>
        </>
      )}
    </>
  );
};
