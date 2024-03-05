import { useState, useEffect } from "react";
import Post from "../../components/Post";
import { axiosClient } from "../../utils/axiosClient";
import { toast } from "react-hot-toast";

function Home() {
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [skip]);

  const fetchPosts = async () => {
    try {
      const res = await axiosClient.get(`posts/?skip=${skip}`);

      if (res?.result.posts.length === 0) {
        setIsEnd(true);
        return;
      }

      // success
      setPosts([...posts, ...res.result.posts]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop >= scrollHeight && !isEnd) {
      setSkip(skip + 10);
    }
  };

  return (
    <div className="min-h-screen bg-lime-900 text-lime-500">
      <h1 className="text-3xl py-2 text-center">Infinite scroll</h1>
      <div
        className="h-screen overflow-scroll scrollbarNone"
        onScroll={handleScroll}
      >
        {/* map all posts here */}
        {posts?.map((post, idx) => (
          <Post key={idx} post={post} />
        ))}
      </div>
      {isEnd && toast.success("You've reached the end")}
    </div>
  );
}

export default Home;
