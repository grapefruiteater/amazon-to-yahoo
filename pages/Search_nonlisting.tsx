import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { InputAdornment } from '@mui/material';

// 検索バーのコンポーネント
const SearchMovie = (props: any) => {
  const { searched1, searched2, initialRows, setRows, setSearched1, setSearched2 } = props;

  // 検索文字によってテーブルの行をフィルター関数
  const requestSearch = (searchedVal1: any, searchedVal2: any) => {
    const filteredRows = initialRows.filter((row: any) => {
      return row.id.toLowerCase().includes(searchedVal1.toLowerCase()) && row.name.toLowerCase().includes(searchedVal2.toLowerCase());   
    });
    setRows(filteredRows);
  };

  // 検索バーの文字が変化したときにフィルターを実行する関数
  const changeSearchedHandler1 = (event: any) => {
    setSearched1(event.target.value);
    requestSearch(event.target.value, searched2);
  };

  const changeSearchedHandler2 = (event: any) => {
    setSearched2(event.target.value);
    requestSearch(searched1, event.target.value);
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="ASIN"
        variant="outlined"
        value={searched1}
        onChange={(event) => changeSearchedHandler1(event)}
        sx={{ marginTop: '0.5rem', marginRight: '1rem' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="outlined-basic"
        label="商品名"
        variant="outlined"
        value={searched2}
        onChange={(event) => changeSearchedHandler2(event)}
        sx={{ marginTop: '0.5rem', marginRight: '1rem' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchMovie;
