# shopping mall with react-ts

### ContextAPI

**concept**

- `<ContextProvider>{children}</ContextProvider>` 하위 컴포넌트에서 context value에 접근가능
- 아래 처럼 useState, useEffect로 상태 동기화 가능

```ts
interface AuthContextDefaultValue {
  user: UserYouShouldKnow | undefined | null;
  uid: string | undefined | null;
  signInRedirect: typeof signInRedirect;
  logout: () => void;
}

const AuthContext = createContext<AuthContextDefaultValue>({
  uid: null,
  user: null,
  signInRedirect: signInRedirect,
  logout,
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [user, setUser] = useState<UserYouShouldKnow | null>();

  useEffect(() => {
    // google auth helper function
    authStateChanged(async (user) => {
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      // 해당 value에 접근가능
      value={{ user: user, uid: user && user.uid, signInRedirect, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// hook으로 관리하기
// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  return useContext(AuthContext);
}
```

### useState! (불변성)

**문제 코드**

```ts
export type CartProducts = Record<ProductId, CartProduct>;

setCartProducts((prev) => {
  const shouldUpdated = { ...prev };
  console.log(shouldUpdated[productId].quantity);
  shouldUpdated[productId].quantity += 1;
  /*
  비록 shoudUpdated가 {…prev} 복사를 했다고는 productId에 직접 값을 넣어줄 경우
  여러번 state가 업데이트 될때 state1, state2, state3 등으로 업데이트 될때
  state3 + 1이 아닌 state1 + 1값으로 업데이트 가능성
   */
  return shouldUpdated;
});
```

**해결 🔥**

```ts
setCartProducts((prev) => {
  const shouldUpdated = { ...prev };
  shouldUpdated[productId] = {
    ...shouldUpdated[productId],
    quantity: shouldUpdated[productId].quantity - 1,
  };

  return shouldUpdated;
});
```

# react-query

### React Query 개념

- 서버 상태와 클라이언트 상태의 동기화를 위한 비동기 데이터 패칭 라이브러리!

### 핵심 키워드

stale-while-revalidate 캐싱 매커니즘
`staleTime : 0` - 데이터의 신선도? - 데이터가 fresh인경우 캐시에서 데이터 가져옴 - stale이 된 경우 데이터는 캐시된 데이터를 가져오지만 특정 조건 발동 -> 백그라운드에서 다시 불러와짐
`refetchOnWindowFocus` - 브라우저 윈도우 포커스(focus event ❌ -> visibilityChange event ✅), 다른 탭에서 본 텝으로 이동
`gcTime` : 비활성화된 쿼리가 제거되는데 시간 `5 * 60 * 60ms` (거의 건드릴 일 없음.)

#### option

- select : 성공 시 가져온 data를 가공해서 전달
- refetchInterval : 주기적으로 refetch 할지 결정하는 옵션 (polling 구현시)

### 핵심 객체.

`QueryClient` 객체

- 쿼리 상태와 `QueryCache`관리함.

`QueryCache`

- 실제 쿼리 데이터들이 저장되는 곳.
- 각 쿼리와 키값을 맵핑해서 저장

#### 기본동작

**basic query**

1. `useQuery`로 키값과 fetch함수 전달
2. `QueryCache`에 해당 키값 ? (기존 캐시되어 있는 데이터 반환) : (패칭 함수 실행 -> 캐시에 저장)
3. 그 후 컴포넌트 리렌더링

**mutation**

1. `useMutation` (POST, PUT, DELETE)등 데이터 변환 작업시 사용
2. 데이터 변경 성공 -> `invalidateQueries 메서드 호출
3. invalidate query는 `stale`로 상태가 변함
