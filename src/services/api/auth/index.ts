import {useMutation} from '@tanstack/react-query';
import {setAuth} from 'stores/authSlice';
import {useAppDispatch} from 'stores/hooks';

export function useLoginAPI() {
  const dispatch = useAppDispatch();
  const {mutate, ...rest} = useMutation({
    mutationKey: ['useLoginAPI'],
    mutationFn: async data => {
      try {
        const response = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username: 'kminchelle',
            password: '0lelplR',
            // expiresInMins: 60, // optional
          }),
        });
        return response.json();
      } catch (error) {
        return error;
      }
    },
    onSuccess: data => {
      console.log('data login', data);
      dispatch(setAuth(data));
      return data;
    },
    onError: err => {
      console.log('err login', err);
      return err;
    },
  });

  return {login: mutate, ...rest};
}
