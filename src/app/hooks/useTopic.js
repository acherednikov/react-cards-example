import { useLocation } from 'react-router-dom';

const useTopic = () => {
  const query = new URLSearchParams(useQuery());
  const topic = query.get('topic') || 'general';

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  return topic
};

export default useTopic;