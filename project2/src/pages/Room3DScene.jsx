import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text, useTexture } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';



// Ghế ngồi
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

// Camera xoay theo ghế
const SeatViewCamera = ({ targetPosition }) => {
    const { camera } = useThree();

    useFrame(() => {
        if (targetPosition) {
            const camPos = new THREE.Vector3(
                targetPosition.x,
                targetPosition.y + 0.8,
                targetPosition.z + 0.5
            );
            camera.position.lerp(camPos, 0.05);
            camera.lookAt(0, 2, -10);
        }
    });

    return null;
};

// Màn hình LED
const LEDScreen = ({ position, size, imageUrl }) => {
    const texture = useTexture(imageUrl);
    return (
        <mesh position={position}>
            <boxGeometry args={size} />
            <meshStandardMaterial map={texture} toneMapped={false} />
        </mesh>
    );
};

// Trụ cột
const Column = ({ position, radius = 1.5, height = 12, color = 'gray' }) => (
    <mesh position={[position[0], height / 2, position[2]]} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height, 32]} />
        <meshStandardMaterial color={color} />
    </mesh>
);

// Sàn bậc, sân khấu
const Block = ({ position, size, color = '#333' }) => (
    <mesh position={position} receiveShadow castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
    </mesh>
);

// Label văn bản
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

// Bàn giám khảo
const Table = ({ position, size = [10, 0.5, 1.2], color = '#b71c1c' }) => (
    <mesh position={position} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
    </mesh>
);

// Mảng tường gỗ giống hình thang
const WallFacet = ({ position, scale = [0.5, 1.5, 0.1] }) => (
    <mesh position={position} castShadow receiveShadow>
        <boxGeometry args={scale} />
        <meshStandardMaterial color="#f5deb3" />
    </mesh>
);

// Đèn LED dưới mảng
const WallLED = ({ position }) => (
    <mesh position={position}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial emissive="#fff9c4" emissiveIntensity={2} color="#fffde7" />
    </mesh>
);

// Vách sân khấu
const StageWall = ({ position, size, rotation = [0, 0, 0], color = '#666' }) => (
    <mesh position={position} rotation={rotation} receiveShadow castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
    </mesh>
);

// Mái sân khấu
const StageRoof = ({ position, size, color = '#444' }) => (
    <mesh position={position} receiveShadow castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
    </mesh>
);
// Bục giảng đơn giản
const Podium = ({ position, size = [1.5, 4, 1], color = '#8B4513' }) => (
    <mesh position={position} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
    </mesh>
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
            <Canvas shadows camera={{ position: [0, 12, 30], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[15, 15, 10]} intensity={1.2} castShadow />
                <Environment preset="sunset" />
                <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.2} />

                {/* Bậc ghế */}
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

                {/* Các phần tử */}
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
                                const stageHeight = 2; // tăng từ 1 → 2
                                const screenHeight = ledHeight;
                                const ledYOffset = stageHeight + ledHeight / 2;
                                return (
                                    <LEDScreen
                                        key={el.i}
                                        position={[x + w / 2, ledYOffset, z + h / 2 - 10 + 1]} // đẩy ra trước sân khấu 1 đơn vị
                                        size={[w, ledHeight, 0.2]}
                                        imageUrl={bannerUrl}
                                    />
                                );
                            }

                            if (isStage) {
                                const stageHeight = 2;
                                const screenHeight = 8;
                                const totalHeight = stageHeight + screenHeight + 2; // mái che cao hơn màn hình

                                const stagePosition = [x + w / 2, stageHeight / 2, z + h / 2 - 10];
                                const stageSize = [w, stageHeight, h + 2];

                                const wallThickness = 0.3;

                                // Thông số bậc thang
                                const stairDepth = 1.2;
                                const stairCount = 4;
                                const stairTotalDepth = stairDepth * stairCount;

                                return (
                                    <React.Fragment key={el.i}>
                                        {/* Sân khấu */}
                                        <Block
                                            position={stagePosition}
                                            size={stageSize}
                                            color={el.color || '#7f8c8d'}
                                        />
                                        {/* Bậc thang trái */}
                                        {Array.from({ length: stairCount }).map((_, i) => {
                                            const stairHeight = 0.5;
                                            const stairZStart = z + h / 2 - 10 + (h + 2) / 2;
                                            const stairZ = stairZStart - stairDepth / 2 - i * stairDepth;

                                            return (
                                                <Block
                                                    key={`left-stair-${i}`}
                                                    position={[x - 0.3, (i * stairHeight) / 2, stairZ]} // dịch sang phải
                                                    size={[1, stairHeight, stairDepth]}
                                                    color="#b0bec5"
                                                />
                                            );
                                        })}


                                        {/* Bậc thang phải */}
                                        {Array.from({ length: stairCount }).map((_, i) => {
                                            const stairHeight = 0.5;
                                            const stairZStart = z + h / 2 - 10 + (h + 2) / 2;
                                            const stairZ = stairZStart - stairDepth / 2 - i * stairDepth;

                                            return (
                                                <Block
                                                    key={`right-stair-${i}`}
                                                    position={[x + w + 0.4, (i * stairHeight) / 2, stairZ]} // đẩy sang trái 0.6 đơn vị
                                                    size={[1, stairHeight, stairDepth]}
                                                    color="#b0bec5"
                                                />
                                            );
                                        })}
                                        <Podium
                                            position={[
                                                x + w - 0.3 - 1.6,
                                                stageHeight / 2 + 1, // nửa chiều cao bục 4 nên +2
                                                stagePosition[2] + stageSize[2] / 2 - 0.5 - 1,
                                            ]}
                                            size={[1.5, 4, 1]}
                                            color="#8B4513"
                                        />











                                        {/* Vách bao quanh sân khấu (bỏ mặt trước) */}

                                        {/* Mặt sau */}
                                        <StageWall
                                            position={[
                                                stagePosition[0],
                                                totalHeight / 2,
                                                stagePosition[2] - stageSize[2] / 2,
                                            ]}
                                            size={[stageSize[0], totalHeight, wallThickness]}
                                            color="#666"
                                        />

                                        {/* Mặt trái (rút ngắn để chừa cầu thang) */}
                                        <StageWall
                                            position={[
                                                stagePosition[0] - stageSize[0] / 2,
                                                totalHeight / 2,
                                                stagePosition[2] - stairTotalDepth / 2,
                                            ]}
                                            size={[wallThickness, totalHeight, stageSize[2] - stairTotalDepth]}
                                            color="#666"
                                        />

                                        {/* Mặt phải (rút ngắn để chừa cầu thang) */}
                                        <StageWall
                                            position={[
                                                stagePosition[0] + stageSize[0] / 2,
                                                totalHeight / 2,
                                                stagePosition[2] - stairTotalDepth / 2,
                                            ]}
                                            size={[wallThickness, totalHeight, stageSize[2] - stairTotalDepth]}
                                            color="#666"
                                        />

                                        <StageRoof
                                            position={[stagePosition[0], totalHeight + wallThickness / 2, stagePosition[2] - 0.5]}
                                            size={[stageSize[0] + wallThickness * 2, wallThickness, stageSize[2] + wallThickness * 2]}
                                            color="#444"
                                        />


                                    </React.Fragment>
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

                {/* Bàn giám khảo */}
                <Table position={[0, 0.25, 2]} size={[cols - 4, 0.5, 1.2]} color="#b71c1c" />

                {/* Vách gỗ + đèn trái (dài hơn 1) */}
                {Array.from({ length: 8 }).map((_, row) =>
                    Array.from({ length: 10 }).map((_, col) => {
                        const x = -cols / 2 - 0.45;
                        const y = 1 + row * 1.6;
                        const z = 5 + col * 2.0 + (row % 2 === 0 ? 0 : 1.0) + 1; // kéo dài thêm 1

                        return (
                            <React.Fragment key={`facet-left-${row}-${col}`}>
                                <WallFacet position={[x, y, z]} />
                                <WallLED position={[x + 0.01, y - 0.9, z]} />
                            </React.Fragment>
                        );
                    })
                )}

                <Block
                    position={[0, 0.6, 29]}
                    size={[cols, 9.6, 6]}
                    color="#dfe6e9"
                />

                <Block
                    position={[0, 7.5, 29]}
                    size={[10, 4, 4]}
                    color="#636e72"
                />

                <Label position={[0, 7.6, 29]} text="Phòng kỹ thuật - Tầng M" />
                <mesh position={[0, 7.5, 27]} receiveShadow>
                    <boxGeometry args={[10, 4, 0.05]} />
                    <meshPhysicalMaterial
                        color="#bbdefb"
                        transmission={0.9}
                        roughness={0.1}
                        thickness={0.1}
                        transparent
                        opacity={0.6}
                    />
                </mesh>

                {/* Label trên kính */}
                <Label position={[0, 9.7, 27]} text="Phòng kỹ thuật - Tầng M" />

                {/* Vách gỗ + đèn phải (dài hơn 1) */}
                {Array.from({ length: 8 }).map((_, row) =>
                    Array.from({ length: 10 }).map((_, col) => {
                        const x = cols / 2 + 0.45;
                        const y = 1 + row * 1.6;
                        const z = 5 + col * 2.0 + (row % 2 === 0 ? 0 : 1.0) + 1; // kéo dài thêm 1

                        return (
                            <React.Fragment key={`facet-right-${row}-${col}`}>
                                <WallFacet position={[x, y, z]} />
                                <WallLED position={[x - 0.01, y - 0.9, z]} />
                            </React.Fragment>
                        );
                    })
                )}

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
