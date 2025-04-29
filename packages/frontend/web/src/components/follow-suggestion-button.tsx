type FollowButtonProps = Readonly<{
  isFollowing: boolean;
  handleFollowClick: () => Promise<void>;
}>;

function FollowButton({ isFollowing, handleFollowClick }: FollowButtonProps) {
  return (
    <button
      type='button'
      onClick={handleFollowClick}
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
