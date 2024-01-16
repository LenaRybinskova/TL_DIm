import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
;
import {Task} from './Task';
import {TaskPriorities, TaskStatuses} from './api/todolists-api';


const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
        removeTask: action('Remove Button clicked changed inside Task'),
        task: {id: '12wsdewfijdei', title: 'JS', status: TaskStatuses.New,description:"",priority:TaskPriorities.Low,startDate:"",deadline:"",order:0,addedDate:"",todoListId:"11111"},
        todolistId: 'fgdosrg8rgjuh'
    }
};

export default meta;
type Story = StoryObj<typeof Task>;


export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
    args: {
        task: {id: '12wsdewfijdei2343', title: 'CSS', status: TaskStatuses.Completed,description:"",priority:TaskPriorities.Low,startDate:"",deadline:"",order:0,addedDate:"",todoListId:"22222"},
    },
};


/*import type {Meta, Story, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task, TaskPropsType} from './Task';


const meta: Meta = {
    title: 'TODOLISTS/Task',
    component: Task,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
};
export default meta;

const Template: Story<TaskPropsType> = (args:any) => <Task {...args} />;

const removeTaskCallback = action(`Task removed`)
const changeTaskStatusCallback = action(`Status changed`)
const changeTaskTitleCallback = action(`Title changed`)

// 1 история
export const isDoneFalse = Template.bind({});
isDoneFalse.args = {
    task: {id: '1', title: 'Sample Task', isDone: false,},
    todolistId: 'todolist1',
    removeTask: removeTaskCallback,
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback
};

// 2 история
export const isDoneTrue = Template.bind({});
isDoneTrue.args = {
    task: {id: '2', title: 'Completed Task', isDone: true,},
    todolistId: 'todolist1',
    removeTask: removeTaskCallback,
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback
}
;*/
