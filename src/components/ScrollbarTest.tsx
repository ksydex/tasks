import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'
import { scrollbarUtils } from '@/hooks/use-scrollbar'

/**
 * Компонент для тестирования глобальной системы скроллбаров.
 * Демонстрирует различные варианты скроллбаров и их адаптацию к темам.
 */
export function ScrollbarTest() {
  const { theme, toggleTheme } = useTheme()

  const handleApplyThin = () => {
    const element = document.getElementById('test-scrollable')
    if (element) {
      scrollbarUtils.applyThin(element)
    }
  }

  const handleHideScrollbar = () => {
    const element = document.getElementById('test-scrollable')
    if (element) {
      scrollbarUtils.hide(element)
    }
  }

  const handleResetScrollbar = () => {
    const element = document.getElementById('test-scrollable')
    if (element) {
      scrollbarUtils.reset(element)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Тест системы скроллбаров</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Текущая тема: <span className="font-medium">{theme}</span>
          </span>
          <Button onClick={toggleTheme} variant="outline" size="sm">
            Переключить тему
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Стандартный скроллбар */}
        <Card>
          <CardHeader>
            <CardTitle>Стандартный скроллбар</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 overflow-y-auto border rounded-md p-4 bg-muted/20">
              <div className="space-y-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="p-3 bg-background rounded border">
                    <h4 className="font-medium">Элемент {i + 1}</h4>
                    <p className="text-sm text-muted-foreground">
                      Это тестовый контент для демонстрации стандартного скроллбара.
                      Скроллбар автоматически адаптируется к текущей теме.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Тонкий скроллбар */}
        <Card>
          <CardHeader>
            <CardTitle>Тонкий скроллбар</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 overflow-y-auto scrollbar-thin border rounded-md p-4 bg-muted/20">
              <div className="space-y-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="p-3 bg-background rounded border">
                    <h4 className="font-medium">Элемент {i + 1}</h4>
                    <p className="text-sm text-muted-foreground">
                      Это тестовый контент для демонстрации тонкого скроллбара.
                      Тонкий скроллбар занимает меньше места.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Скрытый скроллбар */}
        <Card>
          <CardHeader>
            <CardTitle>Скрытый скроллбар</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 overflow-y-auto scrollbar-hide border rounded-md p-4 bg-muted/20">
              <div className="space-y-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="p-3 bg-background rounded border">
                    <h4 className="font-medium">Элемент {i + 1}</h4>
                    <p className="text-sm text-muted-foreground">
                      Это тестовый контент для демонстрации скрытого скроллбара.
                      Скроллбар невидим, но функциональность сохранена.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Интерактивный тест */}
        <Card>
          <CardHeader>
            <CardTitle>Интерактивный тест</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={handleApplyThin} size="sm" variant="outline">
                  Применить тонкий
                </Button>
                <Button onClick={handleHideScrollbar} size="sm" variant="outline">
                  Скрыть скроллбар
                </Button>
                <Button onClick={handleResetScrollbar} size="sm" variant="outline">
                  Сбросить
                </Button>
              </div>
              <div
                id="test-scrollable"
                className="h-32 overflow-y-auto border rounded-md p-4 bg-muted/20"
              >
                <div className="space-y-2">
                  {Array.from({ length: 15 }, (_, i) => (
                    <div key={i} className="p-2 bg-background rounded text-sm">
                      Интерактивный элемент {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Информация о системе */}
      <Card>
        <CardHeader>
          <CardTitle>Информация о системе скроллбаров</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Особенности реализации:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Автоматическая адаптация к светлой и темной темам</li>
                <li>• Поддержка всех современных браузеров (WebKit и Firefox)</li>
                <li>• Использование CSS переменных для динамического изменения цветов</li>
                <li>• Три варианта: стандартный, тонкий и скрытый</li>
                <li>• Доступность и контрастность в соответствии с WCAG</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">CSS переменные:</h4>
              <div className="text-sm text-muted-foreground font-mono bg-muted/20 p-3 rounded">
                <div>--scrollbar-thumb: {theme === 'dark' ? '215 10% 45%' : '220 13% 70%'}</div>
                <div>--scrollbar-thumb-hover: {theme === 'dark' ? '215 10% 55%' : '220 13% 60%'}</div>
                <div>--scrollbar-track: {theme === 'dark' ? '215 10% 15%' : '220 13% 95%'}</div>
                <div>--scrollbar-width: 8px</div>
                <div>--scrollbar-width-thin: 6px</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
