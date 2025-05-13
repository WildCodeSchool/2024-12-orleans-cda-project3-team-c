type FollowButtonProps = Readonly<{
  isFollowing: boolean;
  handleFollowClick: () => Promise<void>;
  username: string;
}>;

function FollowButton({
  isFollowing,
  handleFollowClick,
  username,
}: FollowButtonProps) {
  return (
    <button
      type='button'
      onClick={handleFollowClick}
      title={`${isFollowing ? 'Unfollow' : 'Follow'} ${username}`}
      className={`ml-auto h-6 w-14 cursor-pointer rounded border py-0.5 text-xs ${
        isFollowing
          ? 'border-rose-600 text-rose-600'
          : 'border-turquoise-blue-400 text-turquoise-blue-400 bg-transparent'
      }`}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}

export default FollowButton;
