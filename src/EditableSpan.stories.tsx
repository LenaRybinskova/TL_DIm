import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {EditableSpan} from './EditableSpan';


const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    argTypes: {
        value: {
            description: 'Start value empty. Add value push button set string.'
        },
        onChange: {
            description: 'Value EditableSpan changed'
        }
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
    args: {
        onChange: action('Value EditableSpan changed')
    }
};







//старый вариант написания
/*
import type {Meta, StoryObj} from '@storybook/react';
import {EditableSpan, EditableSpanPropsType} from './EditableSpan';
import {action} from '@storybook/addon-actions';


const meta = {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof EditableSpan>;

export default meta;
type Story = StoryObj<typeof meta>;

const editableSpanCallback = action('изменили на : ')

export const BaseExampleEditableSpan: Story = (args: EditableSpanPropsType) => {
    return <EditableSpan value={"start value"} onChange={editableSpanCallback} />;
};

BaseExampleEditableSpan.args = {
    value:"start value2"
};
*/


