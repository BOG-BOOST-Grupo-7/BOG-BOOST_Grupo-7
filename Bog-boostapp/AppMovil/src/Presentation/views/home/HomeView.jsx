import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  ActivityIndicator, 
  TouchableOpacity, 
  Image, 
  FlatList 
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useHomeViewModel } from './HomeViewModel';
import { styles } from './HomeStyles';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';

export default function HomeView() {
  const router = useRouter();
  const { productosDestacados, ofertasEspeciales, loading, error, recargar } = useHomeViewModel();

  if (loading && productosDestacados.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5b952" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {/* <Header /> */}
      <ScrollView contentContainerStyle={styles.containerHome}>
        <Text style={styles.viewTitle}>Inicio</Text>

        {/* AVISO DE COBERTURA */}
        <View style={styles.avisoCobertura}>
          <View style={styles.avisoIcono}>
            <FontAwesome5 name="truck" size={18} color="#000" />
          </View>
          <View style={styles.avisoTexto}>
            <Text style={styles.avisoTitulo}>Cobertura de Entregas y Envíos</Text>
            <Text style={styles.avisoP}>
              Actualmente realizamos despachos y entregas locales únicamente en <Text style={{ fontWeight: 'bold' }}>Bogotá y alrededores</Text>. ¡Apoya el comercio local de nuestra ciudad!
            </Text>
          </View>
        </View>

        {/* SECCIÓN PRINCIPAL */}
        <View style={styles.mainContent}>
          
          <View style={styles.carruselesColumn}>
            
            {/* Carrusel / Lista de Destacados */}
            <View style={styles.carruselContainer}>
              <Text style={styles.carruselTitle}>Productos Destacados</Text>
              
              <FlatList
                horizontal
                data={productosDestacados}
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.productCard}>
                    <View style={styles.productCardImgContainer}>
                      <Image 
                        source={{ uri: item.imagen || 'https://via.placeholder.com/150' }} 
                        style={{ width: '100%', height: '100%' }} 
                      />
                    </View>
                    <View style={styles.productCardBody}>
                      <Text style={styles.productCardCategory} numberOfLines={1}>{item.categoria}</Text>
                      <Text style={styles.productCardH4} numberOfLines={2}>{item.nombre}</Text>
                      <Text style={styles.productCardPrice}>${item.precio}</Text>
                      <View style={styles.btnCarrito}>
                        <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Añadir</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={styles.sinProductos}>No hay productos destacados</Text>}
              />
            </View>

            {/* Carrusel de Ofertas Especiales */}
            <View style={styles.carruselContainer}>
              <Text style={styles.carruselTitle}>Ofertas Especiales (&lt; $50.000)</Text>
              
              <FlatList
                horizontal
                data={ofertasEspeciales}
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.productCard}>
                    <View style={styles.productCardImgContainer}>
                      <Image 
                        source={{ uri: item.imagen || 'https://via.placeholder.com/150' }} 
                        style={{ width: '100%', height: '100%' }} 
                      />
                    </View>
                    <View style={styles.productCardBody}>
                      <Text style={styles.productCardCategory} numberOfLines={1}>{item.categoria}</Text>
                      <Text style={styles.productCardH4} numberOfLines={2}>{item.nombre}</Text>
                      <Text style={styles.productCardPrice}>${item.precio}</Text>
                      <View style={styles.btnCarrito}>
                        <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Añadir</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={styles.sinProductos}>No hay ofertas especiales</Text>}
              />
            </View>

          </View>

          {/* COLUMNA DERECHA (Mapa y Registro) */}
          <View style={styles.rightColumn}>
            
            <View style={styles.tarjetaMapa}>
              <Text style={styles.mapaH3}>Explora el Mercado</Text>
              <Text style={styles.mapaP}>Ubica los puestos en nuestro mapa interactivo</Text>
              <TouchableOpacity style={styles.botonMapa} onPress={() => router.push('/mapa-mercado')}>
                <Text style={styles.botonMapaText}>Ver Mapa del Mercado</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.negocioCard}>
              <Text style={[styles.carruselTitle, styles.negocioTitle]}>¿Tienes un negocio?</Text>
              <Text style={styles.negocioSubtitle}>Digitaliza tus productos en San Alejo</Text>
              
              <View style={styles.negocioPlaceholder}>
                <MaterialCommunityIcons name="storefront-outline" size={50} color="#f5b952" />
                <Text style={styles.negocioTexto}>Forma parte de la red de comerciantes locales de Bogotá.</Text>
                <TouchableOpacity style={styles.btnRegistrarNegocio} onPress={() => router.push('/registrar-negocio')}>
                  <Text style={styles.btnRegistrarTexto}>Registrar negocio</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>

        </View>

      </ScrollView>
      {/* <Footer /> */}
    </View>
  );
}