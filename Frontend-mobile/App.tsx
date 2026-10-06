import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './src/Presentation/context/CartContext';

// ─── Auth ─────────────────────────────────────────────────────────────────────
import { HomeScreen } from './src/Presentation/views/home/Home';
import { RegisterScreen } from './src/Presentation/views/register/Register';
import { RecuperarScreen } from './src/Presentation/views/register/RecuperarScreen';
import { RegistroNegocioScreen } from './src/Presentation/views/register/RegistroNegocioScreen';

// ─── Cliente ──────────────────────────────────────────────────────────────────
import InicioScreen from './src/Presentation/views/home/InicioScreen';
import CatalogoScreen, { CategoriasScreen } from './src/Presentation/views/products/ProductsScreen';
import MapScreen from './src/Presentation/views/map/MapScreen';
import { NegociosScreen, PerfilNegocioScreen } from './src/Presentation/views/businesses/BusinessesScreen';
import { CarritoScreen, ProcesoCompraScreen, TicketScreen, HistorialScreen, ProductoScreen } from './src/Presentation/views/cart/CartScreen';
import { ComentariosScreen, ContactenosScreen, NotificacionesScreen } from './src/Presentation/views/contact/ContactScreen';
import { PerfilUsuarioScreen } from './src/Presentation/views/profile/info/PerfilUsuarioScreen';

// ─── Vendedor ─────────────────────────────────────────────────────────────────
import { VendedorScreen } from './src/Presentation/views/vendor/VendedorScreen';
import { VendorPerfilScreen } from './src/Presentation/views/vendor/VendorPerfilScreen';
import { AgregarProductoScreen } from './src/Presentation/views/vendor/AgregarProductoScreen';
import { ModificarProductoScreen } from './src/Presentation/views/vendor/ModificarProductoScreen';
import { VendorStockScreen } from './src/Presentation/views/vendor/VendorStockScreen';
import { PedidosScreen } from './src/Presentation/views/vendor/PedidosScreen';
import { VendorContactenosScreen } from './src/Presentation/views/vendor/VendorContactenosScreen';

// ─── Administrador ────────────────────────────────────────────────────────────
import { AdminDashboardScreen } from './src/Presentation/views/admin/AdminDashboard';
import { AdminPerfilScreen } from './src/Presentation/views/admin/AdminPerfilScreen';
import { AdminNegociosScreen } from './src/Presentation/views/admin/AdminNegociosScreen';
import { AdminUsuariosScreen } from './src/Presentation/views/admin/AdminUsuariosScreen';
import { AdminSolicitudesScreen } from './src/Presentation/views/admin/AdminSolicitudesScreen';
import { AdminPqrsScreen } from './src/Presentation/views/admin/AdminPqrsScreen';
import { AdminVentasScreen } from './src/Presentation/views/admin/AdminVentasScreen';

// Definición de tipos para las rutas de la pila de navegación, asegurando el tipado fuerte de los parámetros de cada pantalla.
// Se incluye toda la app migrada desde el diseño de Figma (BOG-BOOST): autenticación, cliente, vendedor y administrador.
export type RootStackParamList = {
  // Autenticación
  HomeScreen: { requiredRole?: 'admin' | 'vendor' } | undefined;
  RegisterScreen: undefined;
  RecuperarScreen: undefined;
  RegistroNegocioScreen: undefined;
  // Cliente
  InicioScreen: undefined;
  CatalogoScreen: undefined;
  CategoriasScreen: undefined;
  MapScreen: undefined;
  NegociosScreen: undefined;
  PerfilNegocioScreen: { negocio: any } | undefined;
  ProductoScreen: { producto: any } | undefined;
  CarritoScreen: undefined;
  ProcesoCompraScreen: undefined;
  TicketScreen: undefined;
  HistorialScreen: undefined;
  ComentariosScreen: undefined;
  ContactenosScreen: undefined;
  NotificacionesScreen: undefined;
  PerfilUsuarioScreen: undefined;
  // Vendedor
  VendedorScreen: undefined;
  VendorPerfilScreen: undefined;
  AgregarProductoScreen: undefined;
  ModificarProductoScreen: undefined;
  VendorStockScreen: undefined;
  PedidosScreen: undefined;
  VendorContactenosScreen: undefined;
  // Administrador
  AdminDashboardScreen: undefined;
  AdminPerfilScreen: undefined;
  AdminNegociosScreen: undefined;
  AdminUsuariosScreen: undefined;
  AdminSolicitudesScreen: undefined;
  AdminPqrsScreen: undefined;
  AdminVentasScreen: undefined;
}

// Crea el navegador de tipo Stack utilizando la lista de parámetros estructurada previamente.
const Stack = createNativeStackNavigator<RootStackParamList>();

// Componente raíz de la aplicación. Envuelve todo en el CartProvider (estado global del carrito),
// configura el contenedor de navegación y define el árbol completo de pantallas de la app.
const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {/* Autenticación */}
          <Stack.Screen name='HomeScreen' component={HomeScreen} />
          <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{ headerShown: true, title: 'Registro' }} />
          <Stack.Screen name='RecuperarScreen' component={RecuperarScreen} options={{ headerShown: true, title: 'Recuperar contraseña' }} />
          <Stack.Screen name='RegistroNegocioScreen' component={RegistroNegocioScreen} options={{ headerShown: true, title: 'Registro de negocio' }} />

          {/* Cliente */}
          <Stack.Screen name='InicioScreen' component={InicioScreen} />
          <Stack.Screen name='CatalogoScreen' component={CatalogoScreen} />
          <Stack.Screen name='CategoriasScreen' component={CategoriasScreen} />
          <Stack.Screen name='MapScreen' component={MapScreen} />
          <Stack.Screen name='NegociosScreen' component={NegociosScreen} />
          <Stack.Screen name='PerfilNegocioScreen' component={PerfilNegocioScreen} />
          <Stack.Screen name='ProductoScreen' component={ProductoScreen} />
          <Stack.Screen name='CarritoScreen' component={CarritoScreen} />
          <Stack.Screen name='ProcesoCompraScreen' component={ProcesoCompraScreen} />
          <Stack.Screen name='TicketScreen' component={TicketScreen} />
          <Stack.Screen name='HistorialScreen' component={HistorialScreen} />
          <Stack.Screen name='ComentariosScreen' component={ComentariosScreen} />
          <Stack.Screen name='ContactenosScreen' component={ContactenosScreen} />
          <Stack.Screen name='NotificacionesScreen' component={NotificacionesScreen} />
          <Stack.Screen name='PerfilUsuarioScreen' component={PerfilUsuarioScreen} />

          {/* Vendedor */}
          <Stack.Screen name='VendedorScreen' component={VendedorScreen} />
          <Stack.Screen name='VendorPerfilScreen' component={VendorPerfilScreen} />
          <Stack.Screen name='AgregarProductoScreen' component={AgregarProductoScreen} />
          <Stack.Screen name='ModificarProductoScreen' component={ModificarProductoScreen} />
          <Stack.Screen name='VendorStockScreen' component={VendorStockScreen} />
          <Stack.Screen name='PedidosScreen' component={PedidosScreen} />
          <Stack.Screen name='VendorContactenosScreen' component={VendorContactenosScreen} />

          {/* Administrador */}
          <Stack.Screen name='AdminDashboardScreen' component={AdminDashboardScreen} />
          <Stack.Screen name='AdminPerfilScreen' component={AdminPerfilScreen} />
          <Stack.Screen name='AdminNegociosScreen' component={AdminNegociosScreen} />
          <Stack.Screen name='AdminUsuariosScreen' component={AdminUsuariosScreen} />
          <Stack.Screen name='AdminSolicitudesScreen' component={AdminSolicitudesScreen} />
          <Stack.Screen name='AdminPqrsScreen' component={AdminPqrsScreen} />
          <Stack.Screen name='AdminVentasScreen' component={AdminVentasScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );

};

export default App
