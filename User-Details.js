import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import styles from './Styles';
import EditModal from './EditModal';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';


const ApiEndpoint =
  'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

const UserDetails = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const pageSize = 10;


  const [isCheckboxVisible, setIsCheckboxVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(ApiEndpoint);
      const jsonData = await response.json();
      setData(jsonData);
      setFilteredData(jsonData);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toLowerCase().includes(text.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSelectRow = (id) => {
    if (isCheckboxVisible) {
      const isSelected = selectedRows.includes(id);
      if (isSelected) {
        setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      } else {
        setSelectedRows([...selectedRows, id]);
      }
    } else {
      setIsCheckboxVisible(true);
      setSelectedRows([id]);
      setSelectedUserId(id);
    }
  };

  const handleDeleteSelected = () => {
    const updatedData = data.filter((item) => !selectedRows.includes(item.id));
    setData(updatedData);
    setFilteredData(updatedData);
    setSelectedRows([]);
    setIsCheckboxVisible(false);
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
  };

  const handleOkEdit = ({ name, email, role }) => {
    const updatedData = data.map((item) =>
      item.id === editModalData.id ? { ...item, name, email, role } : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
    setEditModalVisible(false);
  };

  const handleEditUser = (id) => {
    const selectedUserData = data.find((item) => item.id === id);
    setEditModalData(selectedUserData);
    setEditModalVisible(true);
  };

  const handleDeleteUser = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    setFilteredData(updatedData);
    setSelectedRows([]);
    setIsCheckboxVisible(false);
  };
  const [checked, setChecked] = useState(false);


  const renderRow = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: selectedRows.includes(item.id)
          ? '#CCCCCC'
          : 'transparent',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      // onPress={}
      onLongPress={() => {
        {
          handleSelectRow(item.id)
          setIsCheckboxVisible(!isCheckboxVisible)
        }
      }}
    >
      {isCheckboxVisible && (
        <View style={{ marginRight: 10 }}>
          <CheckBox
            checked={selectedRows.includes(item.id)}
            onPress={() => handleSelectRow(item.id)}
          />
        </View>
      )}

      <View>
        <Text>{item.name}</Text>
        <Text>{item.email}</Text>
        <Text>{item.role}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
        <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
          <View style={{ marginRight: 10 }}>
            <AntDesign name="delete" size={20} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEditUser(item.id)}>
          <FontAwesome name="edit" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );


  const handleDeletePage = () => {
    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = Math.min(currentPage * pageSize, filteredData.length);
    const updatedData = data.filter(
      (item, index) => index < startIdx || index >= endIdx
    );
    setData(updatedData);
    setFilteredData(updatedData);
    setSelectedRows([]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Here..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )}
        keyExtractor={(item) => item.id}
        renderItem={renderRow}
      />
      <View style={styles.paginationContainer}>
        <Text>Page: {currentPage}</Text>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => handlePageChange(1)}
        >
          <Text style={styles.paginationButtonText}>First</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => handlePageChange(Math.max(currentPage - 1, 1))}
        >
          <Text style={styles.paginationButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() =>
            handlePageChange(
              Math.min(
                currentPage + 1,
                Math.ceil(filteredData.length / pageSize)
              )
            )
          }
        >
          <Text style={styles.paginationButtonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() =>
            handlePageChange(Math.ceil(filteredData.length / pageSize))
          }
        >
          <Text style={styles.paginationButtonText}>Last</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.deleteButton,
            { opacity: selectedRows.length === 0 ? 0.5 : 1 },
          ]}
          onPress={handleDeleteSelected}
          disabled={selectedRows.length === 0}
        >
          <Text style={styles.deleteButtonText}>Delete Selected</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePage}>
          <Text style={styles.deleteButtonText}>Delete Page</Text>
        </TouchableOpacity>
      </View>
      <EditModal
        isVisible={editModalVisible}
        onCancel={handleCancelEdit}
        onOk={handleOkEdit}
        initialData={editModalData}
      />
    </View>
  );
};

export default UserDetails;
