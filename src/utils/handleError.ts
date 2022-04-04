import { notification } from 'antd';

export const handleError = (err: any) => {
  if (err?.message.includes('execution reverted')) {
    if (err?.message.includes('not start')) {
      notification.error({
        message: '',
        description: 'Not start',
      });

      return;
    }

    notification.error({
      message: '',
      description: err.message.substr(20, err.message.indexOf('{')) || err.message,
    });
  } else {
    notification.error({
      message: '',
      description: err.message,
    });
  }
};
