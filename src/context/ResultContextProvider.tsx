import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ContextInterface {
  getResults: (data: string) => void;
  results: object | any;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}

export const ResultContext = createContext<ContextInterface>({
  getResults: () => {},
  results: [],
  searchTerm: "",
  setSearchTerm: () => {},
  isLoading: false,
});
const baseUrl = "https://google-search3.p.rapidapi.com/api/v1";

interface Props {
  children: ReactNode;
}

export const ResultContextProvider: FC<Props> = ({ children }) => {
  const [results, setResults] = useState<object>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("Elon Musk");

  const getResults = async (type: string) => {
    setIsLoading(true);

    const response = await fetch(`${baseUrl}${type}`, {
      method: "GET",
      headers: {
        "x-user-agent": "desktop",
        "x-proxy-location": "US",
        "x-rapidapi-host": "google-search3.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY
          ? process.env.REACT_APP_API_KEY
          : "",
      },
    });

    const data = await response.json();

    if (type.includes("/news")) {
      setResults(data.entries);
    } else if (type.includes("/image")) {
      setResults(data.image_results);
    } else {
      setResults(data.results);
    }
    setIsLoading(false);
  };

  const sampleAppContext: ContextInterface | null = {
    getResults,
    results,
    searchTerm,
    setSearchTerm,
    isLoading,
  };

  return (
    <ResultContext.Provider value={sampleAppContext}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
