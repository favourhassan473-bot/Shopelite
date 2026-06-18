import { getSession } from "next-auth/react";

export function withAdminAuth(gssp) {
  return async (context) => {
    const session = await getSession(context);

    if (!session || session.user.role !== "admin") {
      return {
        redirect: {
          destination: "/admin/login",
          permanent: false,
        },
      };
    }

    return await gssp(context, session);
  };
}
