import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions'


const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        onItemAdded: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
    args:{
        disabled:false
    }
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
    args: {
        onItemAdded: action('Button clicked inside form')
    },
};

export const AddItemFormDisabledStory: Story = {
    args:{
        disabled:true
    }

};