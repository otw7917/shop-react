import { UserYouShouldKnow } from "../services/firebase";

interface UserProps extends UserYouShouldKnow {
  photoURL: string | null;
  displayName: string | null;
}

function User({ user }: { user: UserProps }) {
  const { photoURL, displayName } = user;

  return (
    <div className='flex items-center gap-2 shrink-0'>
      {photoURL ? (
        <img
          src={photoURL}
          alt={"profile image"}
          className='w-10 h-10 rounded-full '
        ></img>
      ) : (
        <div className='w-5 h-5 rounded-full bg-slate-200'></div>
      )}
      <span className='hidden md:block'>{displayName}</span>
    </div>
  );
}

export default User;
