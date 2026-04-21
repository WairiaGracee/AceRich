from django.db import models


class Category(models.Model):
    """Course category — Computer, Catering, Hair & Beauty, Housekeeping"""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def __str__(self):
        return self.name


class Course(models.Model):
    LEVEL_CHOICES = [
        ('certificate', 'Certificate'),
        ('diploma', 'Diploma'),
    ]
    MODE_CHOICES = [
        ('full_time', 'Full-time'),
        ('part_time', 'Part-time'),
        ('both', 'Full-time / Part-time'),
    ]

    title       = models.CharField(max_length=200)
    slug        = models.SlugField(unique=True)
    category    = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='courses')
    image_url   = models.URLField(blank=True)
    description = models.TextField()
    overview    = models.TextField()
    duration    = models.CharField(max_length=100)
    level       = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='certificate')
    mode        = models.CharField(max_length=20, choices=MODE_CHOICES, default='both')
    intake      = models.CharField(max_length=200)
    is_active   = models.BooleanField(default=True)
    order       = models.PositiveIntegerField(default=0)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self):
        return self.title


class CourseOutcome(models.Model):
    """A single 'What you'll learn' bullet point"""
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='outcomes')
    text   = models.CharField(max_length=300)
    order  = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.course.title} – {self.text[:50]}'


class CourseModule(models.Model):
    """A single module in a course"""
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    title  = models.CharField(max_length=300)
    order  = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.course.title} – Module {self.order}'