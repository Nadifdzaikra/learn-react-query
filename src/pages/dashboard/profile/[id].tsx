import { withLayout } from "@/utils/withLayout";
import MainLayout from "@/layouts/mainLayout";
import { GetServerSideProps, NextPage } from "next";
import { type User, getUsersById } from "@/api/userApi";
import Link from "next/link";

type ProfileProps = {
  dataProfile: User | null;
};

const ProfilePage: NextPage<ProfileProps> = ({ dataProfile }) => {
  if (!dataProfile) {
    return <h1>User Not Found</h1>;
  }

  return (
    <div className="p-5">
      <button onClick={() => window.history.back()}>back</button>
      <h1>Profile Page</h1>
      <p>Selamat datang di Profile Page</p>
      <h3>
        {dataProfile.username} - {dataProfile.email}
      </h3>
      {/* <button onClick={() => moveHome()}>back home</button> */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const data = await getUsersById(Number(id));
    return {
      props: { dataProfile: data },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { dataProfile: null },
    };
  }
};

// ✅ Pastikan `ProfilePage` dikembalikan dengan tipe yang benar
export default withLayout<ProfileProps>(ProfilePage, MainLayout);
