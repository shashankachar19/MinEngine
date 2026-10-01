import { SimProvider } from './store/SimContext';
import CommandCenter from './components/CommandCenter';

export default function App() {
  return (
    <SimProvider>
      <CommandCenter />
    </SimProvider>
  );
}
