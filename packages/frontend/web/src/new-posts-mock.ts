export default [
  {
    id: 3,
    author: {
      username: 'Teddy_Agt',
      profile_picture: 'teddy_agt-mock.jpg',
      isFollowed: true,
    },
    description: 'Lorem Ipsum @tulipe.maggle dolor sit amet\n\n#meme #memefr',
    created_at: '2025-03-28 09:39:06',
    picture: '01-mock.png',
    likes: 0,
    isLiked: false,
    comments: [
      {
        author: 'yaya.blm',
        content: 'c nul',
      },
      {
        author: 'chief_chl0e',
        content: 'gênant, pas marrant',
      },
    ],
  },
  {
    id: 4,
    author: {
      username: 'cosmo',
      profile_picture: 'cosmo-mock.jpg',
      isFollowed: false,
    },
    description: 'Lorem Ipsum dolor sit amet',
    created_at: '2025-03-27 09:39:06',
    picture: '02-mock.jpg',
    likes: 73,
    isLiked: true,
    comments: [
      {
        author: 'yaya.blm',
        content: 'trop bien',
      },
      {
        author: 'chief_chl0e',
        content: "je t'aime, mari moi",
      },
    ],
  },
];

export type PostType = {
  id: number;
  author: {
    username: string;
    profile_picture: string;
    isFollowed: boolean;
  };
  description: string;
  created_at: string;
  picture: string;
  likes: number;
  isLiked: boolean;
  comments: [
    {
      author: string;
      content: string;
    },
  ];
};
