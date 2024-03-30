import { CollectionConfig } from 'payload/types';

const Anime: CollectionConfig = {
  slug: 'anime',
  admin: {
    useAsTitle: 'title'
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Anime title',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      label: 'Anime description',
      required: true,
    },
    {
      name: 'backgroundUrl',
      type: 'text',
      label: 'Anime background URL (home slider purpose)',
    }
  ],
  endpoints: [
    // Query for anime added within the last three days or more
    {
      path: '/latest',
      method: 'get',
      handler: async (req, res) => {
        try {
          const threeDaysAgo = new Date();
          threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

          const allAnime = await req.payload.find({
            collection: 'anime',
          });

          const newestAnime = allAnime.docs.filter((anime: any) => new Date(anime.createdAt) >= threeDaysAgo);

          res.json(newestAnime);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    }
  ]
};

export default Anime;