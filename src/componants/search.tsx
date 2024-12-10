import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const Search = () => {
  const [searchText, setSearchText] = useState(''); // 검색 텍스트 상태
  const [results, setResults] = useState<string[]>([]); // 검색 결과 (예제 데이터)

  // 검색 데이터 (example database)
  const data = [
    'Song 1',
    'Song 2',
    'Artist 1',
    'Artist 2',
    'Album 1',
    'Album 2',
  ];

  // 검색 로직
  const handleSearch = (text: string) => {
    setSearchText(text);

    // 검색 결과 필터링
    const filteredResults = data.filter(item =>
      item.toLowerCase().includes(text.toLowerCase()),
    );
    setResults(filteredResults);
  };

  return (
    <View style={styles.container}>
      {/* 검색 입력 필드 */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search here..."
        value={searchText}
        onChangeText={handleSearch}
      />

      {/* 검색 결과 표시 */}
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.resultItem}>
            <Text style={styles.resultText}>{item}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchText ? 'No results found.' : 'Start searching...'}
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  searchInput: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#aaa',
    marginTop: 20,
  },
});

export default Search;
