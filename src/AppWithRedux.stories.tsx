 import type {Meta, StoryObj}   from  '@storybook/react';
 import AppWithRedux from './AppWithRedux/AppWithRedux';
 import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';



const  meta: Meta<  typeof  AppWithRedux> = {
    title:   'TODOLISTS/AppWithRedux',
    component:   AppWithRedux,
    tags: [  'autodocs'],
    decorators: [ReduxStoreProviderDecorator]
};

export default  meta;
type Story = StoryObj<  typeof  AppWithRedux>;

export const  AppWithReduxStory: Story = {}






// старый вариант написания
/*
import {Meta, Story} from '@storybook/react';
import AppWithRedux from './AppWithRedux';
import {ReduxStoreProviderDecorator} from './stories/decorators/ReduxStoreProviderDecorator';


const meta: Meta = {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    parameters: {
        layout: 'centered',
    },
    decorators:[ReduxStoreProviderDecorator] // все истории попадут внутрь декоратора и вызовутся там
};
export default meta;

const Template: Story = () => <AppWithRedux />;

// история
export const BaseExampleAppWithRedux = Template.bind({})
BaseExampleAppWithRedux.args={}
*/
