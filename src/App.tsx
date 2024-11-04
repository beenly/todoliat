import React, { useState } from 'react';
import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  VStack,
  IconButton,
  Grid,
  GridItem,
  Flex,
} from '@chakra-ui/react';
import { Checkbox } from './components/ui/checkbox';
import { FaEdit, FaRedoAlt, FaTrashAlt } from 'react-icons/fa';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  deleted: boolean;
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState('');
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskText, setEditTaskText] = useState('');

  const addTask = () => {
    if (task.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: task,
        completed: false,
        deleted: false,
      };
      setTodos([...todos, newTodo]);
      setTask('');
    }
  };

  const deleteTask = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, deleted: true } : todo)));
  };

  const completeTask = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const startEditing = (id: number, text: string) => {
    setEditTaskId(id);
    setEditTaskText(text);
  };

  const updateTask = () => {
    if (editTaskId !== null) {
      setTodos(
        todos.map(todo => (todo.id === editTaskId ? { ...todo, text: editTaskText } : todo))
      );
      setEditTaskId(null);
      setEditTaskText('');
    }
  };

  const cancelEditing = () => {
    setEditTaskId(null);
    setEditTaskText('');
  };

  return (
    <Box p={4} bg="gray.800" minH="100vh" color="white" display="flex" alignItems="center" justifyContent="center">
      <VStack w="full" maxW="md">
        <Text fontSize="3xl" fontWeight="bold" color="gray.300" mb={4}>
          Todo List        
        </Text>
        <HStack>
          <Input
            rounded={'35px'}
            w={'500px'}
            size="lg"
            placeholder="What is the task today?"
            value={task}
            onChange={e => setTask(e.target.value)}
            bg="gray.700"
            color="white"
            _placeholder={{ color: 'gray.400' }}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                addTask();
              }
            }}
          />
          <Button rounded={'35px'} onClick={addTask}>
            Add
          </Button>
        </HStack>
        <Grid templateColumns="repeat(2, 1fr)" gap={30}>
          <GridItem gap="5">
            <Text fontSize="xl" fontWeight="bold" color="blue.300">
              {todos.filter(todo => todo.completed && !todo.deleted).length}/
              {todos.filter(todo => !todo.deleted).length} Todos completed
            </Text>
            {todos
              .filter(todo => !todo.deleted)
              .map(todo => (
                <HStack key={todo.id} bg="gray.700" p={4} rounded="md" boxShadow="md" gap={4}>
                  {editTaskId !== todo.id && (
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => completeTask(todo.id)}
                      colorScheme="green"
                    />
                  )}
                  {editTaskId === todo.id ? (
                    <VStack align="start" w="full">
                      <Input
                        value={editTaskText}
                        onChange={(e) => setEditTaskText(e.target.value)}
                        bg="gray.600"
                        color="white"
                        size="sm"
                      />
                      <HStack>
                        <Button colorScheme="blue" onClick={updateTask}>
                          Update
                        </Button>
                        <Button colorScheme="gray" onClick={cancelEditing}>
                          Cancel
                        </Button>
                      </HStack>
                    </VStack>
                  ) : (
                    <Text as={todo.completed ? 's' : 'span'}>{todo.text}</Text>
                  )}
                  {editTaskId !== todo.id && (
                    <>
                      <IconButton color={'blue.300'}
                        bgColor={'gray.600'}
                        aria-label="Edit task">                       
                        <FaEdit 
                        onClick={() => startEditing(todo.id, todo.text)}
                      />
                      </IconButton>
                      <IconButton color={'red.300'}
                        bgColor={'gray.600'}
                        aria-label="Delete task">
                        
                        <FaTrashAlt 
                        onClick={() => deleteTask(todo.id)}
                      />
                      </IconButton>
                    </>
                  )}
                </HStack>
              ))}
          </GridItem>
          <GridItem gap="5">
            <Text fontSize="xl" fontWeight="bold" color="red.300">
              {todos.filter(todo => todo.deleted).length} Deleted
            </Text>
            {todos
              .filter(todo => todo.deleted)
              .map(todo => (
                <HStack key={todo.id} bg="gray.700" p={4} rounded="md" boxShadow="md">
                  <Checkbox checked={todo.completed} disabled colorScheme="gray">
                    <Text as="s" color="gray.200">{todo.text}</Text>
                  </Checkbox>
                  <Flex gap={2} pr={2} />
                  <IconButton color={'gray.300'}
                    bgColor={'gray.600'}
                    aria-label="Restore task">
                    
                    <FaRedoAlt
                    onClick={() =>
                      setTodos(todos.map(t => (t.id === todo.id ? { ...t, deleted: false } : t)))
                    }
                   />  
                  </IconButton>
                </HStack>
              ))}
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

export default App;

