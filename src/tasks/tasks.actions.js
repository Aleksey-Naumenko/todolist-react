import { fetchTasksList } from './tasksListGateways'

export const SET_TASKS_LIST = 'SET_TASKS_LIST';

export const setTaskList = tasksList => {
    return {
        type: SET_TASKS_LIST,
        payload: {
            tasksList,
        }
    }
};

export const getTasksList = () => {
    return (dispatch) => {
        fetchTasksList()
            .then(tasksList => {
                dispatch(setTaskList(tasksList))
            })
    };
};