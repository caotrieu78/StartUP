import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text, useTexture } from '@react-three/drei';

const LEDScreen = ({ position, size, imageUrl }) => {
    const texture = useTexture(imageUrl);
    return (
        <mesh position={position}>
            <boxGeometry args={size} />
            <meshStandardMaterial map={texture} toneMapped={false} />
        </mesh>
    );
};
const Chair = ({ position, selected, onClick }) => (
    <group position={position} rotation={[0, Math.PI, 0]} onClick={onClick}>
        <mesh castShadow>
            <boxGeometry args={[0.8, 0.4, 0.8]} />
            <meshStandardMaterial color={selected ? '#10b981' : '#e53935'} />
        </mesh>
        <mesh position={[0, 0.4, -0.35]} castShadow>
            <boxGeometry args={[0.8, 0.8, 0.1]} />
            <meshStandardMaterial color={selected ? '#10b981' : '#b71c1c'} />
        </mesh>
    </group>
);


const Column = ({ position, radius = 1.5, height = 12, color = 'gray' }) => (
    <mesh position={[position[0], height / 2, position[2]]} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height, 32]} />
        <meshStandardMaterial color={color} />
    </mesh>
);

const Block = ({ position, size, color = '#333' }) => (
    <mesh position={position} receiveShadow castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
    </mesh>
);

const Label = ({ position, text }) => (
    <Text
        position={position}
        fontSize={0.6}
        color="black"
        anchorX="center"
        anchorY="middle"
        maxWidth={30}
    >
        {text}
    </Text>
);

const Room3DScene = ({ elements, cols, selectedSeats, toggleSeat }) => {
    const bannerUrl = '/img/Banner.png';
    const baseY = 0.4;
    const stepY = 0.2;

    const seatRows = Array.from(
        new Set(elements.filter((el) => el.type === 'chair').map((el) => el.y))
    ).sort((a, b) => a - b);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas shadows camera={{ position: [0, 10, 25], fov: 45 }}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
                <Environment preset="sunset" />
                <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.1} />



                {/* Các bậc ghế ngồi */}
                {seatRows.map((y) => {
                    const elevation = baseY + y * stepY;
                    return (
                        <Block
                            key={`step-${y}`}
                            position={[0, elevation / 2, y + 0.5]}
                            size={[cols, elevation, 1]}
                            color="#cfd8dc"
                        />
                    );
                })}

                {/* Các phần tử như ghế, màn hình, sân khấu */}
                {elements.map((el) => {
                    const x = el.x - cols / 2;
                    const z = el.y;
                    const w = el.w || 1;
                    const h = el.h || 1;
                    const elevation = el.type === 'chair' ? baseY + el.y * stepY : 0.2;

                    switch (el.type) {
                        case 'chair':
                            return (
                                <Chair
                                    key={el.i}
                                    position={[x + w / 2, elevation, z + h / 2]}
                                    selected={selectedSeats.includes(el.i)}
                                    onClick={() => toggleSeat(el.i)}
                                />
                            );

                        case 'custom': {
                            const isLED = el.label?.toLowerCase().includes('màn hình');
                            const isStage = el.label?.toLowerCase().includes('sân khấu');

                            if (el.shape === 'circle') {
                                return (
                                    <Column
                                        key={el.i}
                                        position={[x + w / 2, 0, z + h / 2]}
                                        color={el.color}
                                    />
                                );
                            }

                            if (isLED) {
                                const ledHeight = 8;
                                const stageHeight = 1;
                                const ledYOffset = stageHeight + ledHeight / 2; // nằm trên sân khấu
                                return (
                                    <LEDScreen
                                        key={el.i}
                                        position={[x + w / 2, ledYOffset, z + h / 2 - 10]} // sát tường
                                        size={[w, ledHeight, 0.2]}
                                        imageUrl={bannerUrl}
                                    />
                                );
                            }


                            if (isStage) {
                                const stageHeight = 1; // cao hơn để LED nằm trên
                                return (
                                    <Block
                                        key={el.i}
                                        position={[x + w / 2, stageHeight / 2, z + h / 2 - 10]} // nằm dưới LED
                                        size={[w, stageHeight, h + 2]} // kéo sân khấu ra trước
                                        color={el.color || '#7f8c8d'}
                                    />
                                );
                            }
                            return (
                                <Block
                                    key={el.i}
                                    position={[x + w / 2, 0.2, z + h / 2]}
                                    size={[w, 0.4, h]}
                                    color={el.color || '#999'}
                                />
                            );
                        }

                        case 'label':
                        case 'arrow':
                            return (
                                <Label
                                    key={el.i}
                                    position={[x + w / 2, 2, z + h / 2]}
                                    text={el.label}
                                />
                            );

                        default:
                            return null;
                    }
                })}

                {/* Sàn nhà */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="#d0f0fd" />
                </mesh>
            </Canvas>
        </div>
    );
};

export default Room3DScene;
