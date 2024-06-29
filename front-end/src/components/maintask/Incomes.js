import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Table,Modal, ModalHeader, ModalBody, ModalFooter, Card,CardBody,CardTitle } from 'reactstrap';
import axios from 'axios';
import { FaEdit, FaTrash ,FaExclamationTriangle,FaRupeeSign} from 'react-icons/fa';
import base_url from '../../api/bootapi';
import { toast } from 'react-toastify';

const Incomes = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  
  const [editingId, setEditingId] = useState(null);
  const loggedInUser = localStorage.getItem('loginUser'); 
  const token = JSON.parse(loggedInUser).jwtToken;
  const useremail =  JSON.parse(loggedInUser).username;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [incomeToDelete, setIncomeToDelete] = useState(null);


  useEffect(() => {
    fetchincomes();
    fetchExpenses();
  }, []);


  const fetchincomes = async () => {
    try {
      const response = await axios.get(`${base_url}/get-incomes/${useremail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const incomesData = response.data.map(Income => ({
        ...Income,
        amount: parseFloat(Income.amount)
      }));
      setIncomes(incomesData);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${base_url}/get-expenses/${useremail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const expensesData = response.data.map(expense => ({
        ...expense,
        amount: parseFloat(expense.amount)
      }));
      setExpenses(expensesData);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleAddIncome = async () => {
    const newIncome = { title, amount: parseFloat(amount), date, useremail:useremail };
    try {
      if (editingId) {
        await axios.put(`${base_url}/update-income/${editingId}`, newIncome, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setIncomes(incomes.map(income => (income.id === editingId ? { ...income, ...newIncome } : income)));
        setEditingId(null);
        toast.success('Income updated successfully!!');
      } else {
        await axios.post(`${base_url}/add-income`, newIncome, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setIncomes([...incomes, newIncome]);
        toast.success('Income added  successfully!!');
      }
      setTitle('');
      setAmount('');
      setDate('');
     

    } catch (error) {
        toast.error('Something went wrong..Try again!!');
      console.error('Error adding/updating Income:', error);
    }
  };
  
  const handleDeleteIncome = async () => {
    try {
      await axios.delete(`${base_url}/delete-income/${incomeToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIncomes(incomes.filter(income => income.id !== incomeToDelete));
      setDeleteModalOpen(false);
    toast.success('Income deleted successfully..');
   
    } catch (error) {
      console.error('Error deleting Income:', error);
    }
  };

  const handleEditIncome = (id) => {
    const Income = incomes.find(exp => exp.id === id);
    setTitle(Income.title);
    setAmount(Income.amount);
    setDate(Income.date);
    setEditingId(id);
  };

  const toggleDeleteModal = (IncomeId) => {
    setIncomeToDelete(IncomeId);
    setDeleteModalOpen(!deleteModalOpen);
  };

  

  const totalExpense = expenses.reduce((acc, expense) => acc + (expense.amount || 0), 0);
  const totalIncome = incomes.reduce((acc, income) => acc + (income.amount || 0), 0);
  const Available = totalIncome - totalExpense;

  return (
    <Container fluid className="mt-5">
  <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <CardBody>
            <FaRupeeSign size={30} className="mb-2" color="#a736d6" />
              <CardTitle>{totalIncome}</CardTitle>
              <p>Total Incomes</p>
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <CardBody>
              <FaRupeeSign size={30} className="mb-2" color="#a736d6" />
              <CardTitle>{totalExpense}</CardTitle>
              <p>Total Expenses</p>
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <CardBody>
            <FaRupeeSign size={30} className="mb-2" color="#a736d6" />
              <CardTitle>{Available}</CardTitle>
              <p>Available Balance</p>
            </CardBody>
          </Card>
        </Col>

      
      </Row>

      <Row>
        <Col md={4}>
          <Card>
            <CardBody>
              <CardTitle style={{fontSize:'20px'}}>Add Income</CardTitle>
              <Form className="Income-form mt-4">
                <FormGroup>
                  <Label for="title">Salary Title</Label>
                  <Input type="text" id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} />
                </FormGroup>
                <FormGroup>
                  <Label for="amount">Salary Amount</Label>
                  <Input type="number" id="amount" name="amount" value={amount} onChange={e => setAmount(e.target.value)} />
                </FormGroup>
                <FormGroup>
                  <Label for="date">Date</Label>
                  <Input type="date" id="date" name="date" value={date} onChange={e => setDate(e.target.value)} />
                </FormGroup>            
                <Button className='bg-success' style={{borderRadius:'50px'}} onClick={handleAddIncome}>{editingId ? 'Update Income' : 'Add Income'}</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>

        <Col md={8}>
        <div style={{height:'400px',overflowY:'auto'}}>
        <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Date</th>
              
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map(Income => (
                <tr key={Income.id}>
                  <td>{Income.title}</td>
                  <td><FaRupeeSign/>{Income.amount.toFixed(2)}</td>
                  <td>{Income.date}</td>
                
                  <td>
                    <FaEdit className='text-primary' onClick={() => handleEditIncome(Income.id)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                    <FaTrash  className='text-danger' onClick={() => toggleDeleteModal(Income.id)} style={{ cursor: 'pointer' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
          </Col>
        </Row>
        {/* Delete confirmation modal */}
     <Modal isOpen={deleteModalOpen} toggle={toggleDeleteModal} centered>
      <ModalHeader toggle={toggleDeleteModal}>
        <FaExclamationTriangle style={{ marginRight: '10px', color: 'red' }} />
        Confirm Delete
      </ModalHeader>
      <ModalBody>
        Are you sure you want to delete this Income?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={handleDeleteIncome}>Delete</Button>
        <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
       

    </Container>
  );
};

export default Incomes;
