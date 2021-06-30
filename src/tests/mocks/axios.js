import axios from 'axios';

jest.mock('axios', () => jest.fn());

axios.get = jest.fn().mockImplementation({});
