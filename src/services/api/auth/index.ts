import {useMutation} from '@tanstack/react-query';

export function useLoginAPI() {
  const {mutate, ...rest} = useMutation({
    mutationKey: ['addBanner'],
    mutationFn: async data => {
      fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: 'kminchelle',
          password: '0lelplR',
          // expiresInMins: 60, // optional
        }),
      })
        .then(res => res.json())
        .then(console.log);
    },
    onSuccess: data => {
      return data;
    },
    onError: err => {
      return err;
    },
  });

  return {addBanner: mutate, ...rest};
}
